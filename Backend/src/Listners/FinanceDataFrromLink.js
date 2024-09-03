const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const { ormdb } = require('../../configuration/db');
const axios = require('axios');
const path = require('path');
const util = require('util');
const cron = require('node-cron');

// Function to generate the dynamic file path based on the current date and time
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

// Function to download the file from the remote server and extract the file name
const downloadFile = async (url) => {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    // Extract the file name from the Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'unknown_file.csv'; // Fallback file name

    if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
        }
    }

    const filePath = generateFilePath(fileName);

    // Create a write stream to save the file locally
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath));
        writer.on('error', reject);
    });
};

// Function to delete the file from the remote server
const deleteRemoteFile = async (url) => {
    try {
        await axios.delete(url);
        console.log('File deleted from the remote server');
    } catch (error) {
        console.error('Error deleting file from the remote server:', error);
    }
};

// Function to process the data
const processInvoiceData = (data) => {
    const invoices = {};

    data.forEach(row => {
        const Branch = row['Branch'];
        const Division = row['Division'];
        const invoiceNo = row['Invoice No.'];
        const airwayBillNo = row['Airway Bill No.'];
        const issueDate = row['Issue Date'];
        const amount = parseFloat(row['Amount (LCR)'] || 0);
        const accountCode = row['Account Code'];
        const lineAmount = parseFloat(row['Amount (LCR)'] || 0);

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

        if (accountCode.startsWith('3') || accountCode.startsWith('218')) {
            invoices[invoiceNo].Revenue += lineAmount;
        } else if (accountCode.startsWith('261') || accountCode.startsWith('278')) {
            invoices[invoiceNo].GST += lineAmount;
        } else if (accountCode.startsWith('2') && !accountCode.startsWith('218')) {
            invoices[invoiceNo].Reimbursement += lineAmount;
        }
    });

    Object.keys(invoices).forEach(invoiceNo => {
        const invoice = invoices[invoiceNo];
        const totalCalculated = invoice.Revenue + invoice.Reimbursement + invoice.GST;

        const epsilon = 0.0001;
        invoice.Status = Math.abs(totalCalculated - invoice.Amount) < epsilon;

        if (!invoice.Status) {
            console.log("Error in Invoice, sending mail...");
        }
    });

    return invoices;
};

// Function to insert the processed data into the master table
const insertIntoMasterTable = (invoices) => {
    Object.keys(invoices).forEach(invoiceNo => {
        const invoice = invoices[invoiceNo];

        const insertQuery = `
            INSERT INTO finance_master_data (Branch, Division, InvoiceNo, AirwayBillNo, IssueDate, Amount, Revenue, Reimbursement, GST, Status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        ormdb.query(insertQuery, [
            invoice.Branch, invoice.Division, invoiceNo, invoice.AirwayBillNo, 
            invoice.IssueDate, invoice.Amount, invoice.Revenue, invoice.Reimbursement, 
            invoice.GST, invoice.Status
        ], (err, results) => {
            if (err) {
                console.error('Database error:', err);
            } else {
                console.log('Master row inserted:', results.insertId);
            }
        });
    });
};

// Function to process the remote file and insert data
const processRemoteFile = async () => {
    console.log('processRemoteFile processRemoteFile processRemoteFile:');

    const fileUrl = 'http://remote-server.com/path/to/file'; // Replace with actual file URL

    try {
        // Step 1: Download the file from the remote server and get the file path
        const filePath = await downloadFile(fileUrl);
        console.log('File downloaded successfully:', filePath);

        // Step 2: Process the CSV file
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

        const dataRows = [];
        const query = util.promisify(ormdb.query).bind(ormdb);

        for (const row of rows) {
            const Invoice_No = row['Invoice No.'] || '';
            const checkQuery = `SELECT count(InvoiceNo) AS count FROM finance_master_data WHERE InvoiceNo = ?`;

            const result = await query(checkQuery, [Invoice_No]);
            const isDuplicate = result[0].count > 0;

            if (!isDuplicate) {
                // Insert the row into the `financedata` table
                const insertQuery = `
                    INSERT INTO financedata (
                        Branch, Division, InvoiceNo, IssueDate, Salesgroup, 
                        AirwayBillNo, MasterAirwayBillNo, ReferenceNo, BillToName, 
                        ShipperName, ConsigneeName, S_R_Date, S_R_No,
                        Amount, Account_Code, Invoice_Create_Date
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                await query(insertQuery, [
                    row['Branch'], row['Division'], Invoice_No, row['Issue Date'], 
                    row['Sales group'], row['Airway Bill No.'], row['Master Airway Bill No.'], 
                    row['Reference No.'], row['Bill To Name'], row['Shipper Name'], 
                    row['Consignee Name'], row['S/R Date'], row['S/R No.'], 
                    row['Amount (LCR)'], row['Account Code'], row['Invoice Create Date']
                ]);

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

        // Step 3: Delete the file from the remote server
        await deleteRemoteFile(fileUrl);

    } catch (error) {
        console.error('Error processing file:', error);
    }
};

// // Schedule the task to run every day at 2 AM
// cron.schedule('0 2 * * *', () => {
//     console.log('Running scheduled task at 2 AM');
//     processRemoteFile();
// });

cron.schedule('26 16 * * *', () => {
    console.log('Running scheduled task at 16:23 (4:23 PM)');
    processRemoteFile();
});

