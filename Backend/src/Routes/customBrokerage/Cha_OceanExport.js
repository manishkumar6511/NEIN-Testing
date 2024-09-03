const { ormdb, sqlServerConnectionPool } = require('../../../configuration/db');
const sql = require('mssql'); 

exports.getJobData = (req, res) => {
    console.log("This is CHA Ocean Export  ");

    const jobNo = req.body.jobNo;

    if (!jobNo) {
        return res.status(400).send("JOB NO. required");
    }

    const checkExistenceQuery = "SELECT Initiator_Name, register_branch, Register_Sub_branch, Created_Date FROM `ocean_export_custom_brokerage` WHERE `JOB_DOCKET_NO` = ?";
    const checkExistenceParams = [jobNo];

    ormdb.query(checkExistenceQuery, checkExistenceParams, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while checking JOB NO. existence");
        }

        if (result.length > 0) {
            return res.status(404).send(result);
        } else {
            sqlServerConnectionPool.then(pool => {
                const fetchWithUserQuery = `
                SELECT TOP 1
                    IWR.Job_No,
                    OM.Org_Name,
                    IWR.BE_No,
                    IWR.BE_Date
                FROM [Logisys].dbo.ImpWorkReg IWR
                LEFT JOIN [Logisys].dbo.Organization_Master OM ON IWR.Party_ID = OM.Org_Id
                WHERE IWR.Job_No LIKE @jobNo
            `;

                pool.request()
                    .input('jobNo', sql.VarChar, jobNo)
                    .query(fetchWithUserQuery)
                    .then(result => {
                        res.json(result.recordset);
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).send("An error occurred while fetching data from SQL Server");
                    });
            }).catch(err => {
                console.error(err);
                res.status(500).send("Failed to connect to SQL Server");
            });
        }
    });
};


exports.InsertChaOExport= (req, res) => {


    console.log("this is CHA Ocean  Export  insert "); 
          const data =     req.body;
          console.log("data "+data);
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    console.log("Current Year: " + currentYear);
    const registerBranchId = data.Register_Branch_Id;
    const mawbNumber = data.MAWB_NO;
    const HAWB_NO = data.HAWB_NO;
    
    const maxJobCountQuery = " select MAX(sequenceId) as  id from  ocean_export_custom_brokerage ";
                               
    ormdb.query(maxJobCountQuery, [registerBranchId, currentYear], (err, maxCountResult) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching max JobCount");
            return;
        }
    
        const maxCount = maxCountResult[0].count || 0; // Handle case where no rows found
        const newJobCount = maxCount + 1;
        
        // Update data object with calculated values
       data.OR_JOB_NO = registerBranchId+"/OEC"+currentYear+"/"+newJobCount ;
        data.sequenceId = newJobCount;
    
    query = "INSERT INTO `ocean_export_custom_brokerage` SET  ? ";
    
    
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
    
    