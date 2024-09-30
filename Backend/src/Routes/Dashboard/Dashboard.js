const {ormdb,leavemanagement,test}=require('../../../configuration/db');


exports.AirImportDahboard= (req, res) => {

    const FromDate = req.body.FromDate;
    const Todate = req.body.Todate;
    const DESTINATION_AIRPROT_CODE = req.body.BranchCode;
   // const BranchId = req.body.BranchId;
    let query;
    let queryParams = [];
    // console.log(FromDate);
    // console.log(Todate);
    // console.log(BranchId);


        query = "  SELECT  * FROM airimport_ff_ftp AS f  WHERE  date(f.createdDate) BETWEEN ? AND ?  AND f.DESTINATION_AIRPROT_CODE=?  AND flag =0 ";
       queryParams = [FromDate,Todate,DESTINATION_AIRPROT_CODE];

 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            //console.log(result.length);
            res.json(result);
        }
    });

}
exports.AirExportDahboard = (req, res) => {
    const FromDate = req.body.FromDate;
    const Todate = req.body.Todate;
    const BranchId = req.body.BranchId;
    let query;
 
    // Assuming BranchId is a string like "30,11,32,53"
    let BranchIdArray = BranchId.split(',').map(id=>id.trim());  // Split by comma to create an array
 
    // Create a dynamic placeholder for each BranchId in the array
    let branchPlaceholders = BranchIdArray.map(() => '?').join(',');
 
    // Modify the query to use the dynamic branch placeholders
    query = `
      SELECT *
      FROM airexport_ff_ftp AS f
      WHERE DATE(STR_TO_DATE(f.BL_CONSO_DATE, '%d-%m-%y'))
        BETWEEN STR_TO_DATE( ?, '%d-%m-%Y')
        AND STR_TO_DATE( ?, '%d-%m-%Y')
        AND f.BRANCH IN (${branchPlaceholders})
        AND flag = 0
    `;
 
    // Combine the query parameters (FromDate, ToDate, and all the branch IDs)
    let queryParams = [FromDate, Todate, ...BranchIdArray];
 
    // Log query and parameters for debugging
    console.log("SQL Query: ", query);
    console.log("Query Parameters: ", queryParams);
 
    ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error("SQL Error: ", err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            if (result.length === 0) {
                res.status(404).send("No data found");
            } else {
                console.log(result.length);
                res.json(result);
            }
        }
    });
}
exports.OceanImportDahboard= (req, res) => {

    const FromDate = req.body.FromDate;
    const Todate = req.body.Todate;
    const BranchId = req.body.BranchId;
    let query;
    let queryParams = [];
    // console.log(FromDate);
    // console.log(Todate);
    // console.log(BranchId);


        query = " SELECT  * FROM ocean_import_ff_ftp AS f  WHERE  date(f.Created_date) BETWEEN  ? AND ?  AND f.Branch_Code=?  AND flag =0 ";
       queryParams = [FromDate,Todate,BranchId];

 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            //console.log(result.length);
            res.json(result);
        }
    });

}

exports.OceanExportDahboard= (req, res) => {

    const FromDate = req.body.FromDate;
    const Todate = req.body.Todate;
    const BranchId = req.body.BranchId;
    let query;
    let queryParams = [];
    // console.log(FromDate);
    // console.log(Todate);
    // console.log(BranchId);


        query = " SELECT  * FROM ocean_export_ff_ftp AS f  WHERE  date(f.created_date) BETWEEN  ? AND ?  AND f.Branch_Code= ?  AND flag =0  ";
       queryParams = [FromDate,Todate,BranchId];

 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            //console.log(result.length);
            res.json(result);
        }
    });

}


exports.AirImporttFF= (req, res) => {

    const FromDate = req.body.FromDate;
    const Todate = req.body.Todate;
    const BranchId = req.body.BranchId;
    console.log("from Date user selected",FromDate);
    console.log("to Date user selected",Todate);

    let query;
    let queryParams = [];
 

        query = "SELECT  "+
 " a.BRANCH,s.branch_code , "+
  " COUNT(*) AS total_count, "+
  " SUM(CASE WHEN Flag = 1 THEN 1 ELSE 0 END) AS completed_count, "+
  " SUM(CASE WHEN Flag = 0 THEN 1 ELSE 0 END) AS incomplete_count, "+
  " SUM(CASE WHEN fiancecapture = 1 and Flag=1  THEN 1 ELSE 0 END) AS fiancecapture_complete_count , "+
  " SUM(CASE WHEN fiancecapture = 0 and Flag=1  THEN 1 ELSE 0 END) AS fianceincomplete "+
" FROM  "+
 "  airexport_ff_ftp a "+
   " INNER JOIN subbranchwise s ON a.BRANCH = s.branch_type_code  "+
" WHERE  "+
  " STR_TO_DATE(BL_CONSO_DATE, '%d-%m-%Y') BETWEEN ? AND ? "+
" GROUP BY  "+
  " BRANCH;";
       queryParams = [FromDate,Todate];

 ormdb.query(query, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            //console.log(result.length);
            res.json(result);
        }
    });

}


