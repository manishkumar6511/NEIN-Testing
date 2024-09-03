const { ormdb, sqlServerConnectionPool } = require('../../../configuration/db');

exports.InsertOceanExportRemovals= (req, res) => {


    console.log("this is Removals Ocean Export insert "); 
          const data =     req.body;
          console.log("data "+data);
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    console.log("Current Year: " + currentYear);
    const registerBranchId = data.Register_Branch_Id;
    const mawbNumber = data.MAWB_NO;
    const HAWB_NO = data.HAWB_NO;
    
    const maxJobCountQuery = " select MAX(sequenceId) as  id from  ocean_export_removals ";
                               
    ormdb.query(maxJobCountQuery, [registerBranchId, currentYear], (err, maxCountResult) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching max JobCount");
            return;
        }
    
        const maxCount = maxCountResult[0].count || 0; // Handle case where no rows found
        const newJobCount = maxCount + 1;
        
        // Update data object with calculated values
       data.OR_JOB_NO = registerBranchId+"/OER"+currentYear+"/"+newJobCount ;
        data.sequenceId = newJobCount;
    
    query = "INSERT INTO `ocean_export_removals` SET  ? ";
    
    
    ormdb.query(query, data ,(err, result,feilds) => {
           if (err) {
               console.error(err);
               res.status(500).send("An error occurred while Inserting  data");
           } else {
          //  updateMasterStatus(mawbNumber,HAWB_NO);
               res.json(result);
           }
       });
    
    });
    };
    
    