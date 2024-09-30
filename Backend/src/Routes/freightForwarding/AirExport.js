
const {ormdb,leavemanagement,test}=require('../../../configuration/db');
exports.getAllMaster= (req, res) => {
    const mawbNumber = req.body.MAWB_NO;
    let query;
    let queryParams = [];
    console.log(mawbNumber);

    if (mawbNumber) {
        query = "SELECT DISTINCT  MAWB_BL_NO FROM `airexport_ff_ftp` WHERE `MAWB_BL_NO` LIKE ? AND flag =0 ";
        queryParams = [`%${mawbNumber}%`];
    } else {
        query = "SELECT DISTINCT MAWB_BL_NO FROM `airexport_ff_ftp` ";
    }
 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};


exports.getAllMasterFromFF= (req, res) => {
    const mawbNumber = req.body.MAWB_NO;
    let query;
    let queryParams = [];
    console.log(mawbNumber);

    if (mawbNumber) {
        query = "SELECT DISTINCT  MAWB_NO FROM `air_export_ff` WHERE `MAWB_NO` LIKE ? ";
        queryParams = [`%${mawbNumber}%`];
    } else {
        query = "SELECT DISTINCT MAWB_NO FROM `air_export_ff` ";
    }
 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};

exports.getMasterData = (req, res) => {
   // const mawbNumber = req.query.MAWB_NO;
    const mawbNumber = req.body.MAWB_NO;

    if (!mawbNumber) {
        return res.status(400).send("MAWB_NO  required");
    }

    let checkExistenceQuery = "SELECT * FROM `airexport_ff_ftp` WHERE `MAWB_BL_NO` = ?";
    // let checkExistenceParams = [`%${mawbNumber}%`];
    let checkExistenceParams = [mawbNumber];

    ormdb.query(checkExistenceQuery, checkExistenceParams, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while checking MAWB_NO existence");
        }

        if (result.length === 0) {
            return res.status(404).send("No records found for the provided MAWB_NO");
        }

      let checkFlagQuery = "SELECT * FROM `airexport_ff_ftp` LEFT JOIN newins_iata_codes on DSCODE=DESTINATION_CITY  WHERE `MAWB_BL_NO` = ? AND flag = 0 ";
        let checkFlagParams = [mawbNumber];

        ormdb.query(checkFlagQuery, checkFlagParams, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("An error occurred while checking flags");
            }

            if (result.length > 0) {
                // If there are records with flag=0, return them
                return res.json(result);
            } else {
                // If all records have flag=1, fetch the records along with the user names
                let fetchWithUserQuery = `
                  
                    SELECT Initiator_Name, Register_Branch_Id, Register_Sub_branch,Created_Date FROM air_export_ff WHERE MAWB_NO =? AND flag = 1
                    LIMIT 1 ;
                `;
                let fetchWithUserParams = [mawbNumber];

                ormdb.query(fetchWithUserQuery, fetchWithUserParams, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("An error occurred while fetching data with user names");
                    }
                    res.json(result);
                });
            }
        });
    });
}

// const getJobCount=(req,res)=>{
//     console.log("tjhis is job count ");

//         const query ="SELECT Max(JobCount) as count FROM `air_export_ff` WHERE `Register_Branch_Id`='30' and YEAR(Created_Date)='2024' ";
//     ormdb.query(query ,(err, result,feilds) => {
//            if (err) {
//                console.error(err);
//                res.status(500).send("An error occurred while Inserting  data");
//            } else {
//                res.json(result);
//            }
//        });
// }

const updateMasterStatus=(mawbNumber ,hawb)=>{
        console.log("this is update ");
        data=[mawbNumber,hawb];
    const query ="UPDATE airexport_ff_ftp SET  flag='1' where MAWB_BL_NO =? AND MASTER_HOUSE_BL =? ";
    ormdb.query(query,data ,(err, result,feilds) => {
           if (err) {
               console.error(err);
             //  res.status(500).send("An error occurred while Inserting  data");
           } else {
            console.log("MAWB_BL_NO " +mawbNumber +"  ANd hawb "+hawb + " Status has been chnaged ");
              // res.json(result);
           }
       });

}

exports.UpdateDataFF = (req, res) => {
    console.log("Updating data in the air_export_ff table");

    // Extract data from the request body
    const {
        BUYING_RATE,
        CUSTOMS_CLEARANCE_DATE,
        DUE_CARRIER,
        FREIGHT_AMOUNT,
        IATA_AGENT,
        Industry,
        MARGIN_KG,
        MainProduct,
        NETDUE,
        OperationPic,
        REMARKS,
        SELL_RATE,
        SHIPPER_INVOICE_NO,
        SHIPPING_BILL_DATE,
        SHIPPING_BILL_NO,
        SUB_AGENT,
        SalesPic,
        TOTAL_MARGIN,
        cha,
        clearanceDoneBy,
        salesPicBranch
    } = req.body;

    const mawbNumber = req.body.MAWB_NO; 
    const hawb = req.body.HAWB_NO;  

    // Prepare the query and data
    let query = `
        UPDATE air_export_ff SET 
            BUYING_RATE = ?, 
            CUSTOMS_CLEARANCE_DATE = ?, 
            DUE_CARRIER = ?, 
            FREIGHT_AMOUNT = ?, 
            IATA_AGENT = ?, 
            Industry = ?, 
            MARGIN_KG = ?, 
            MainProduct = ?, 
            NETDUE = ?, 
            OperationPic = ?, 
            REMARKS = ?, 
            SELL_RATE = ?, 
            SHIPPER_INVOICE_NO = ?, 
            SHIPPING_BILL_DATE = ?, 
            SHIPPING_BILL_NO = ?, 
            SUB_AGENT = ?, 
            SalesPic = ?, 
            TOTAL_MARGIN = ?, 
            cha = ?, 
            clearanceDoneBy = ?, 
            salesPicBranch = ?
        WHERE MAWB_NO = ? `;

    const data = [
        BUYING_RATE,
        CUSTOMS_CLEARANCE_DATE,
        DUE_CARRIER,
        FREIGHT_AMOUNT,
        IATA_AGENT,
        Industry,
        MARGIN_KG,
        MainProduct,
        NETDUE,
        OperationPic,
        REMARKS,
        SELL_RATE,
        SHIPPER_INVOICE_NO,
        SHIPPING_BILL_DATE,
        SHIPPING_BILL_NO,
        SUB_AGENT,
        SalesPic,
        TOTAL_MARGIN,
        cha,
        clearanceDoneBy,
        salesPicBranch,
        mawbNumber
    ];
    if (hawb) {
        query += " AND HAWB_NO = ?";
        data.push(hawb);
    }

    

    // Execute the query
    ormdb.query(query, data, (err, result, fields) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while updating the data");
        } else {
            console.log(`MAWB_BL_NO ${mawbNumber} and MASTER_HOUSE_BL ${hawb} status have been updated`);
            res.json({ success: true, message: "Data updated successfully" });
        }
    });
}

exports.InsertAExport= (req, res) => {
 
 
    console.log("this is insert ");
          const data =     req.body;
          console.log("data "+data);
 
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    console.log("Current Year: " + currentYear);
    const registerBranchId = data.Register_Branch_Id;
    const registerBranchCode=data.Register_Branch_Code;
    const mawbNumber = data.MAWB_NO;
    const HAWB_NO = data.HAWB_NO;
 
 const maxJobCountQuery = "SELECT MAX(JobCount) as count FROM `air_export_ff` WHERE `Register_Branch_Id`=? AND YEAR(Created_Date)=?";
 
    ormdb.query(maxJobCountQuery, [registerBranchId, currentYear], (err, maxCountResult) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching max JobCount");
            return;
        }
   
        const maxCount = maxCountResult[0].count !== null ? maxCountResult[0].count : 0;
    const newJobCount = maxCount + 1;
 
 
        // Update data object with calculated values
       data.JOB_DOCKETNO = "AEF/"+registerBranchCode+"/"+currentYear+"/"+newJobCount;
        data.JobCount = newJobCount;
 
    query = "INSERT INTO `air_export_ff` SET  ? ";
 
   
    ormdb.query(query, data ,(err, result,feilds) => {
           if (err) {
               console.error(err);
               res.status(500).send("An error occurred while Inserting  data");
           } else {
            updateMasterStatus(mawbNumber,HAWB_NO);
               res.json(result);
           }
       });
   
    });
};
 



exports.getMasterDataFromFF = (req, res) => {
    // const mawbNumber = req.query.MAWB_NO;
     const mawbNumber = req.body.MAWB_NO;
 
     if (!mawbNumber) {
         return res.status(400).send("MAWB_NO  required");
     }
 
     let checkExistenceQuery = "SELECT * FROM `air_export_ff` WHERE `MAWB_NO` = ?";
     // let checkExistenceParams = [`%${mawbNumber}%`];
     let checkExistenceParams = [mawbNumber];
 
     ormdb.query(checkExistenceQuery, checkExistenceParams, (err, result) => {
         if (err) {
             console.error(err);
             return res.status(500).send("An error occurred while checking MAWB_NO existence");
         }
 
         if (result.length === 0) {
             return res.status(404).send("No records found for the provided MAWB_NO");
         }

         else{
            res.json(result);
         }

       
     });
 }


  
 exports.ae_Docket = (req, res) => {
    const mawbNumber = req.body.Dokcet;  // Assuming the key is 'Dokcet', should this be 'Docket'?
    let query = "SELECT Orignal_Docket_No FROM `air_export_ff` WHERE `Orignal_Docket_No`= ?";
   
    console.log("Docket Number: ", mawbNumber);
 
    // Execute query to check if the docket number exists
    ormdb.query(query, [mawbNumber], (err, result) => {
        if (err) {
            console.error("Error occurred while fetching data:", err);
            return res.status(500).send("An error occurred while fetching data");
        }
 
        // Check if the docket number was found
        if (result.length === 0) {
            return res.json({ exists: false, message: "Docket number not found" });
        } else {
            return res.json({ exists: true, message: "Docket number exists", data: result });
        }
    });
};
 
 