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
exports.AirExportDahboard= (req, res) => {

    const FromDate = req.body.FromDate;
    const Todate = req.body.Todate;
    const BranchId = req.body.BranchId;
    let query;
    let queryParams = [];
    // console.log(FromDate);
    // console.log(Todate);
    // console.log(BranchId);


        query = "  SELECT  * FROM airexport_ff_ftp AS f  WHERE  date(f.createdDate) BETWEEN ? AND ?  AND f.BRANCH=?  AND flag =0 ";
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

