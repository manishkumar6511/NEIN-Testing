
const {ormdb,leavemanagement,test,sqlServerConnection}=require('../../../configuration/db');
const sendEmail = require('../../Listners/sendmail');


exports.getAllIndustry= (req, res) => {



        query = "SELECT * FROM `updatedindustryas` ";
    
 ormdb.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            // sendEmail(
            //     'Manish',
            //     'manish.kumar@nipponexpress.com',
            //     'manish.kumar@nipponexpress.com',
            //     '<h1>Hello World</h1>',
            //     'Test Subject'
            // );
            res.json(result);
        }
    });
};
exports.getAllUser= (req, res) => {

        query = "SELECT u.`user_name`,u.`emp_id`,u.`branch_id`,b.branch_name FROM leavemanagement.`user` u  "+
				 " inner join leavemanagement.branchmaster b on b.branch_id=u.branch_id  "+
				 " WHERE  u.`employee_status`='yes' ";
    
 leavemanagement.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};



exports.getAllMaster= (req, res) => {
    const mawbNumber = req.body.MAWB_NO;
    let query;
    let queryParams = [];
    console.log(mawbNumber);

    if (mawbNumber) {
        query = "SELECT DISTINCT  MAWB_NO FROM `airimport_ff_ftp` WHERE `MAWB_NO` LIKE ?  AND flag =0";
        queryParams = [`%${mawbNumber}%`];
    } else {
        query = "SELECT DISTINCT MAWB_NO FROM `airimport_ff_ftp` ";
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

    let checkExistenceQuery = "SELECT * FROM `airimport_ff_ftp` WHERE `MAWB_NO` = ?  ";
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

      let checkFlagQuery = "SELECT * FROM `airimport_ff_ftp` INNER JOIN newins_iata_codes on DSCODE=ORIGIN  WHERE `MAWB_NO` = ? AND flag = 0";
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
                  
                    SELECT Initiator_Name, Register_Branch_Id, Register_Sub_branch,Created_Date FROM air_import_ff WHERE MAWB_NO =? AND flag = 1
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



const updateMasterStatus=(mawbNumber ,hawb)=>{
    console.log("this is update ");
    data=[mawbNumber,hawb];
const query ="UPDATE airimport_ff_ftp SET  flag='1' where MAWB_NO =? AND HAWB_NO =? ";
ormdb.query(query,data ,(err, result,feilds) => {
       if (err) {
           console.error(err);
         //  res.status(500).send("An error occurred while Inserting  data");
       } else {
        console.log("MAWB_NO " +mawbNumber +"  ANd hawb "+hawb + " Status has been chnaged ");
          // res.json(result);
       }
   });

}

exports.InsertAExport= (req, res) => {


console.log("this is aIr import  insert "); 
      const data =     req.body;
      console.log("data "+data);

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
console.log("Current Year: " + currentYear);
const registerBranchId = data.Register_Branch_Id;
const mawbNumber = data.MAWB_NO;
const HAWB_NO = data.HAWB_NO;

const maxJobCountQuery = "SELECT MAX(JobCount) as count FROM `air_import_ff` WHERE `Register_Branch_Id`=? AND YEAR(Created_Date)=?";

ormdb.query(maxJobCountQuery, [registerBranchId, currentYear], (err, maxCountResult) => {
    if (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching max JobCount");
        return;
    }

    const maxCount = maxCountResult[0].count || 0; // Handle case where no rows found
    const newJobCount = maxCount + 1;

    // Update data object with calculated values
   data.JOB_DOCKETNO = "AIF/"+registerBranchId+"/"+currentYear+"/"+newJobCount;
    data.JobCount = newJobCount;

query = "INSERT INTO `air_import_ff` SET  ? ";


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


exports.getAllHawb= (req, res) => {
    const mawbNumber = req.body.MAWB_NO;
    let query;
    let queryParams = [];
    console.log(mawbNumber);

    if (mawbNumber) {
        query = "SELECT DISTINCT  MAWB_NO FROM `air_import_ff` WHERE `MAWB_NO` LIKE ?  AND flag =0";
        queryParams = [`%${mawbNumber}%`];
    } else {
        query = "SELECT DISTINCT MAWB_NO FROM `air_import_ff` ";
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


exports.getHawbData = (req, res) => {
   // const mawbNumber = req.query.MAWB_NO;
    const mawbNumber = req.body.MAWB_NO;

    if (!mawbNumber) {
        return res.status(400).send("MAWB_NO  required");
    }

    let checkExistenceQuery = "SELECT * FROM `air_import_ff` WHERE `MAWB_NO` = ?  ";
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

      let checkFlagQuery = "SELECT * FROM `air_import_ff`   WHERE `MAWB_NO` = ? ";
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
                  
                    SELECT Initiator_Name, Register_Branch_Id, Register_Sub_branch,Created_Date FROM air_import_ff WHERE MAWB_NO =? AND flag = 1
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