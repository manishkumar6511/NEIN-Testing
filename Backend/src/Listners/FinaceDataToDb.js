const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const { ormdb } = require('../../configuration/db');
const multer = require('multer');
const path = require('path');

// Function to generate the dynamic file path based on current date and time
const generateFilePath = (originalName) => {
    const now = moment();
    const year = now.year();
    const month = now.format('MM');
    const day = now.format('DD');
    const hour = now.format('HH');
    const uploadDir = path.join('E:/neinSoft/files/Nippon-OR/Upload', `${year}/${month}/${day}/${hour}`);

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    return path.join(uploadDir, originalName);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.dirname(generateFilePath(file.originalname)));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const processInvoiceData = (data) => {
    // console.log("this is procces data " +data);
    const invoices = {};

    data.forEach(row => {
      
        const Branch = row['Branch'];
     
        const Division = row['Division'];
     
        const invoiceNo = row['Invoice No.'];
     
        const airwayBillNo = row['Airway Bill No.'];
   
        const issueDate = row['Issue Date'];
      
        const amount = parseFloat(row['Amount (LCR)'] || 0);

        const accountCode = row['Account Code'];

        const lineAmount = parseFloat(row['Amount (LCR)']|| 0);


        if (!invoices[invoiceNo]) {
            invoices[invoiceNo] = {
                Branch: Branch,
                Division: Division,
                AirwayBillNo: airwayBillNo,
                IssueDate: issueDate,
                Amount: amount,
                Revenue: 0,
                Reimbursement: 0,
                GST: 0
            };
        }

        const accountNumber = parseInt(accountCode.slice(0, 3), 10); // Get the first three digits

        if (accountCode.startsWith('3') || accountCode.startsWith('218')) {
            invoices[invoiceNo].Revenue += lineAmount;
        } else if (accountNumber >= 261 && accountNumber <= 278) {
            invoices[invoiceNo].GST += lineAmount;
        } else if (accountCode.startsWith('2') && !accountCode.startsWith('218')) {
            invoices[invoiceNo].Reimbursement += lineAmount;
        }
        
    });


    Object.keys(invoices).forEach(invoiceNo => {
        const invoice = invoices[invoiceNo];
        const totalCalculated = invoice.Revenue + invoice.Reimbursement + invoice.GST;
            // console.log("totalCalculated "+totalCalculated);
            // console.log("nvoice.Amount "+invoice.Amount);
          // Define a small epsilon value to account for floating-point precision issues
    const epsilon = 0.0001;
    invoice.Status = Math.abs(totalCalculated - invoice.Amount) < epsilon;

    if(!invoice.Status){

        console.log("Error in Invoice send mail ");
        console.log("sending mail....");
    }

    });

    return invoices;
};

// Function to insert the processed data into the master table
const insertIntoMasterTable = (invoices) => {
    Object.keys(invoices).forEach(invoiceNo => {
        const invoice = invoices[invoiceNo];

        // console.log("invoice ");
        // console.log(invoice);

        const insertQuery = `
            INSERT INTO finance_master_data (Branch,Division,
                InvoiceNo, AirwayBillNo, IssueDate, Amount, Revenue, Reimbursement, GST, Status
            ) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?)
        `;

        ormdb.query(insertQuery, [invoice.Branch,invoice.Division,
            invoiceNo, invoice.AirwayBillNo, invoice.IssueDate, invoice.Amount, 
            invoice.Revenue, invoice.Reimbursement, invoice.GST, invoice.Status
        ], (err, results) => {
            if (err) {
                console.error('Database error:', err);
            } else {
                console.log('Master row inserted:', results.insertId);
            }
        });
    });
};


const util = require('util');

app.post('/upload', upload.single('file'), async (req, res) => {
    const dataRows = [];
    console.log("this is the upload ");
  
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;

    try {
        const rows = await new Promise((resolve, reject) => {
            const resultRows = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('headers', (headers) => {
                    headers = headers.map(header => header.trim());
                })
                .on('data', (row) => {
                    const trimmedRow = {};
                    Object.keys(row).forEach(key => {
                        trimmedRow[key.trim()] = row[key] ? row[key].trim() : '';
                    });
                    resultRows.push(trimmedRow);
                })
                .on('end', () => {
                    resolve(resultRows);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });

        // Promisify the ormdb.query function
        const query = util.promisify(ormdb.query).bind(ormdb);

        for (const row of rows) {
            const Branch = row['Branch'] || '';
            const Division = row['Division'] || '';
            const Invoice_No = row['Invoice No.'] || ''; 
            const Issue_Date  = row['Issue Date'];
            const Sales_group = row['Sales group'] || '';
            const Airway_Bill_No = row['Airway Bill No.'] || '';
            const Master_Airway_Bill_No = row['Master Airway Bill No.'] || '';
            const Reference_No = row['Reference No.'] || '';
            const Bill_To_Name = row['Bill To Name'] || '';
            const Shipper_Name = row['Shipper Name'] || '';
            const Consignee_Name = row['Consignee Name'] || '';
            const SR_Date = row['S/R Date'];
            const SR_No = row['S/R No.'] || '';
            const Amount = row['Amount (LCR)'] || '';
            const Account_Code = row['Account Code'] || '';
            const Invoice_Create_Date = row['Invoice Create Date'];

            const checkQuery = `SELECT count(InvoiceNo) AS count FROM finance_master_data WHERE InvoiceNo = ?`;

            const result = await query(checkQuery, [Invoice_No]);

            const isDuplicate = result[0].count > 0;
            if (!isDuplicate) {
                const insertQuery = `
                    INSERT INTO financedata (
                        Branch, Division, InvoiceNo, IssueDate, Salesgroup, 
                        AirwayBillNo, MasterAirwayBillNo, ReferenceNo, BillToName, 
                        ShipperName, ConsigneeName, S_R_Date, S_R_No,
                        Amount, Account_Code, Invoice_Create_Date
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                const insertResults = await query(insertQuery, [
                    Branch, Division, Invoice_No, Issue_Date, Sales_group, 
                    Airway_Bill_No, Master_Airway_Bill_No, Reference_No, Bill_To_Name, 
                    Shipper_Name, Consignee_Name, SR_Date, SR_No, 
                    Amount, Account_Code, Invoice_Create_Date
                ]);

                console.log('Row inserted:', insertResults.insertId);
                dataRows.push(row);
            } else {
                console.log('Duplicate entry found. Skipping insert.');
            }
        }

        if (dataRows.length > 0) {
            const processedInvoices = processInvoiceData(dataRows);
            insertIntoMasterTable(processedInvoices);
        }

        console.log('CSV file successfully processed');
        res.status(200).send('File processed and data inserted successfully.');
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('An error occurred while processing the file.');
    }
});



app.post('/getHAWB_NO',  (req, res) => {
    const mawbNumber = req.body.HAWB_NO;
    let query;
    let queryParams = [];
    console.log(mawbNumber);

    if (mawbNumber) {
        query = "SELECT ae.HAWB_NO FROM air_export_ff ae WHERE ae.MAWB_NO LIKE ? UNION SELECT ae.HAWB_NO FROM air_export_ff ae WHERE ae.HAWB_NO LIKE ? ";

        queryParams = [`%${mawbNumber}%`,`%${mawbNumber}%`];
    } else {
        query = "SELECT ae.HAWB_NO FROM air_export_ff ae UNION SELECT ae.MAWB_NO FROM air_export_ff ae ;";
    }
 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });


});

app.post('/getInvoice',  (req, res) => {
    const mawbNumber = req.body.Invoice_No;
    const Division = req.body.Division;
    let query;
    let queryParams = [];
    console.log(mawbNumber);

    if (mawbNumber) {
        query = "SELECT ae.InvoiceNo FROM finance_master_data ae WHERE ae.InvoiceNo LIKE ? AND Division=? ";

        queryParams = [`%${mawbNumber}%`,Division];
    } else {
        query = "SELECT ae.InvoiceNo FROM finance_master_data ae ;";
    }
 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });


});


app.post('/getHAWB_NOData',  (req, res) => {
    const mawbNumber = req.body.HAWB_NO;
    let query;
    let queryParams = [];
    console.log(mawbNumber);
    if (!mawbNumber) {
        return res.status(400).send("MAWB_NO  required");
    }
   
        query = " SELECT ae.*, fm.* FROM air_export_ff ae LEFT JOIN finance_master_data fm ON ae.MAWB_NO = fm.AirwayBillNo WHERE ae.MAWB_NO = ? " +
      "  UNION "+
"  SELECT ae.*, fm.* FROM air_export_ff ae LEFT JOIN finance_master_data fm ON ae.HAWB_NO = fm.AirwayBillNo WHERE ae.HAWB_NO = ? ";
    
        queryParams = [mawbNumber,mawbNumber];

 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
});

app.post('/getHAWB_NODataFromInvoice',  (req, res) => {
    const mawbNumber = req.body.Invoice_No;
    let query;
    let queryParams = [];
    console.log(mawbNumber);
    if (!mawbNumber) {
        return res.status(400).send("MAWB_NO  required");
    }
   


        query = " SELECT ae.*, fm.* FROM air_export_ff ae LEFT JOIN finance_master_data fm ON ae.MAWB_NO = fm.AirwayBillNo WHERE ae.MAWB_NO = ( SELECT AirwayBillNo  FROM finance_master_data  WHERE InvoiceNo = ? ) " +
      "  UNION "+
"  SELECT ae.*, fm.* FROM air_export_ff ae LEFT JOIN finance_master_data fm ON ae.HAWB_NO = fm.AirwayBillNo WHERE ae.HAWB_NO = ( SELECT AirwayBillNo  FROM finance_master_data  WHERE InvoiceNo =  ? ) ";
    
        queryParams = [mawbNumber,mawbNumber];

 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
});



module.exports = app;
