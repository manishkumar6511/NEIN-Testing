
const {ormdb}=require('../../../configuration/db');


exports.getAllMaster= (req, res) => {
    const mawbNumber = req.body.MAWB_NO;
    let query;
    let queryParams = [];
    console.log(mawbNumber);

    if (mawbNumber) {
        query = "SELECT DISTINCT  MBL_No FROM `ocean_import_ff_ftp` WHERE `MBL_No` LIKE ?  AND flag =0";
        queryParams = [`%${mawbNumber}%`];
    } else {
        query = "SELECT DISTINCT MBL_No FROM `ocean_import_ff_ftp` WHERE flag =0 ";
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
        return res.status(400).send("MBL  required");
    }

    let checkExistenceQuery = "SELECT * FROM `ocean_import_ff_ftp` WHERE `MBL_No` = ?  ";
    // let checkExistenceParams = [`%${mawbNumber}%`];
    let checkExistenceParams = [mawbNumber];

    ormdb.query(checkExistenceQuery, checkExistenceParams, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while checking MBL existence");
        }

        if (result.length === 0) {
            return res.status(404).send("No records found for the provided MBL");
        }

      let checkFlagQuery = "SELECT * FROM `ocean_import_ff_ftp`   WHERE `MBL_No` = ? AND flag = 0";
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
                  
                    SELECT Initiator_Name, Register_Branch_Id, Register_Sub_branch,Created_Date FROM ocean_import_ff WHERE MBL_NO =? AND flag = 1
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
const query ="UPDATE ocean_import_ff_ftp SET  flag='1' where MBL_No =? AND HBL_No =? ";
ormdb.query(query,data ,(err, result,feilds) => {
       if (err) {
           console.error(err);
         //  res.status(500).send("An error occurred while Inserting  data");
       } else {
        console.log("MBL_No " +mawbNumber +"  ANd HBL_No "+hawb + " Status has been chnaged ");
          // res.json(result);
       }
   });

}

exports.InsertOImport= (req, res) => {


console.log("this is Ocean  import  insert "); 
      const data =     req.body;
      console.log("data "+data);

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
console.log("Current Year: " + currentYear);
const registerBranchId = data.Register_Branch_Id;
const mawbNumber = data.MAWB_NO;
const HAWB_NO = data.HAWB_NO;

const maxJobCountQuery = "SELECT MAX(JobCount) as count FROM `ocean_import_ff` WHERE `Register_Branch_Id`=? AND YEAR(Created_Date)=?";

ormdb.query(maxJobCountQuery, [registerBranchId, currentYear], (err, maxCountResult) => {
    if (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching max JobCount");
        return;
    }

    const maxCount = maxCountResult[0].count || 0; // Handle case where no rows found
    const newJobCount = maxCount + 1;

    // Update data object with calculated values
   data.JOB_DOCKETNO = "OIF/"+registerBranchId+"/"+currentYear+"/"+newJobCount;
    data.JobCount = newJobCount;

query = "INSERT INTO `ocean_import_ff` SET  ? ";


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

