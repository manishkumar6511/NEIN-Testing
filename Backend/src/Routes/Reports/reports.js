const {ormdb}=require('../../../configuration/db');
 
//fright Forword
 
//Air Import
exports.ffAimportALL= (req, res) => {
    console.log("this is ffAimportALL ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
          query = "SELECT * FROM `air_import_ff` WHERE Register_Branch_Id= ? AND Created_Date BETWEEN  ? AND  ? ;";
     
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
 
 
// Air Export
 
 
exports.getAllData= (req, res) => {
  console.log("this si reports air export");
  console.log(req.body);
 
 
        query = "SELECT * FROM `air_export_ff` WHERE Register_Branch_Id=?  AND STR_TO_DATE(`MAWB_DATE`, '%d-%m-%Y') BETWEEN ? AND  ? ;";
   
 ormdb.query(query,[req.body.subBranch,req.body.fromDate,req.body.toDate] , (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};
 
//Comparison of shipment details Report
exports.getAllComparison= (req, res) => {
  console.log("this is Comparison air export");
     
 
 
        query = "SELECT DATE_FORMAT(STR_TO_DATE(`BL_CONSO_DATE`, '%d-%m-%Y'), '%d-%m-%Y') AS `Date`, COUNT(*) AS `Total_Entries`, SUM(`TOTAL_CHARGEABLE_WGT`) AS `TOTAL_CHARGEABLE_WGT` "+
          " FROM  `airexport_ff_ftp` WHERE  `BL_CONSO_DATE` LIKE ?     AND `BRANCH` = ? GROUP BY    `BL_CONSO_DATE` " +
          " ORDER BY   STR_TO_DATE(`BL_CONSO_DATE`, '%d-%m-%Y') ASC; ";
   
         
 ormdb.query(query,[ `%${req.body.date}%`, req.body.BranchId] , (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};
 
 
exports.getCWR= (req, res) => {
  console.log("this is CWR air export");
     
 
 
        query = "SELECT "+
   " ind.main_product AS MainProduct, "+
    " ind.industry_code, "+
    " COUNT(*) AS NoOfShipments, "+
    " SUM(air_expff.HAWB_GROSS_WEIGHT) AS TotalGrossWeight, "+
    " SUM(air_expff.MAWB_CHARGEABLE_WEIGHT_KG) AS TotalChargeableWeight "+
" FROM  "+
  "   air_export_ff air_expff  "+
" JOIN  "+
  "   industry ind ON air_expff.Industry = ind.main_product  "+
" WHERE   STR_TO_DATE(air_expff.MAWB_DATE, '%d-%m-%Y') BETWEEN ? AND ? AND Register_Branch_Id=?  "+
" GROUP BY  "+
 "    ind.main_product, ind.industry_code "+
" ORDER BY  "+
  "   ind.main_product ";
   
    console.log(req.body);     
 ormdb.query(query,[req.body.fromDate,req.body.toDate,req.body.subBranch] , (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};
 
 
//Top 15
exports.getTop15= (req, res) => {
  console.log("this is top 15 air export");
     
 
 
        query = "SELECT " +
  "  `SHIPPER` AS ShipperName, " +
     " SUM(`MAWB_CHARGEABLE_WEIGHT_KG`) AS TotalChargeableWeightKG, " +
     " SUM(`MAWB_TOTAL_FREIGHT_AMOUNT`) AS TotalFreightAmount" +
 "  FROM " +
    "  `air_export_ff` " +
"  WHERE " +
   "   STR_TO_DATE(`MAWB_DATE`, '%d-%m-%Y') BETWEEN ? AND ?  " +
    "  AND `Register_Branch_Id` = ? " +
"  GROUP BY  " +
  "    `SHIPPER` " +
"  HAVING  " +
   "   SUM(`MAWB_CHARGEABLE_WEIGHT_KG`) > 0 " +
"  ORDER BY  " +
   "   TotalChargeableWeightKG DESC " +
"  LIMIT 15; ";
   
    console.log(req.body);     
 ormdb.query(query,[req.body.fromDate,req.body.toDate,req.body.subBranch] , (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};
 
//getTopCarrier
exports.getTopCarrier= (req, res) => {
  console.log("this is getTopCarrier air export");
     
 
 
query = "SELECT  "+
      "   `AIR_LINE_NAME` AS AirlineName,   "+
        "  SUM(`MAWB_CHARGEABLE_WEIGHT_KG`) AS TotalChargeableWeightKG,   "+
       "   SUM(`MAWB_TOTAL_FREIGHT_AMOUNT`) AS TotalFreightAmount  "+
    "  FROM   "+
      "    `air_export_ff`  "+
   "   WHERE   "+
     "     STR_TO_DATE(`MAWB_DATE`, '%d-%m-%Y') BETWEEN ? AND ?  "+
       "   AND `Register_Branch_Id` = ?  "+
    "  GROUP BY   "+
      "    `AIR_LINE_NAME`  "+
    "  HAVING   "+
       "   SUM(`MAWB_CHARGEABLE_WEIGHT_KG`) > 0  "+
    "  ORDER BY   "+
       "   TotalChargeableWeightKG DESC; ";
   
         console.log(req.body);
 ormdb.query(query,[req.body.fromDate,req.body.toDate,req.body.subBranch] , (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};
 
 
//getOperationPic
exports.getPIC= (req, res) => {
  console.log("this is getPIC air export");
     
 
 
query = "SELECT  "+
   " `OperationPic` AS OperationPerson,  "+
     " COUNT(*) AS NumberOfEntries,  "+
     "  SUM (`MAWB_CHARGEABLE_WEIGHT_KG`) AS TotalChargeableWeightKG "+
 "  FROM  "+
     "  `air_export_ff` "+
 "  WHERE  "+
    "  STR_TO_DATE(`MAWB_DATE`, '%d-%m-%Y') BETWEEN ? AND ? "+
     "  AND `Register_Branch_Id` = ? "+
 "  GROUP BY  "+
    "  `OperationPic` "+
 "  HAVING  "+
     " SUM(`MAWB_CHARGEABLE_WEIGHT_KG`) > 0 "+
 "  ORDER BY  "+
    "  TotalChargeableWeightKG DESC ";
   
         
 ormdb.query(query,[ req.body.fromDate,req.body.toDate,req.body.subBranch] , (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching data");
        } else {
            res.json(result);
        }
    });
};
 

//get Sales  pIC
exports.getSalesPIC= (req, res) => {
    console.log("this is getSalesPIC air export");
       
   
   
  query = "SELECT  "+
     " `SalesPic` AS SalesPic ,  "+
       " COUNT(*) AS NumberOfEntries,  "+
       "  SUM (`MAWB_CHARGEABLE_WEIGHT_KG`) AS TotalChargeableWeightKG "+
   "  FROM  "+
       "  `air_export_ff` "+
   "  WHERE  "+
      "  STR_TO_DATE(`MAWB_DATE`, '%d-%m-%Y') BETWEEN ? AND ? "+
       "  AND `Register_Branch_Id` = ? "+
   "  GROUP BY  "+
      "  `SalesPic` "+
   "  HAVING  "+
       " SUM(`MAWB_CHARGEABLE_WEIGHT_KG`) > 0 "+
   "  ORDER BY  "+
      "  TotalChargeableWeightKG DESC ";
     
           
   ormdb.query(query,[ req.body.fromDate,req.body.toDate,req.body.subBranch] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };

  //Area wise Report


  exports.getAreaReport= (req, res) => {
    console.log("this is getAreaReport air export");
       
   
   
  query = "SELECT" +
 " `Area`, "+
  "SUM(`MAWB_CHARGEABLE_WEIGHT_KG`) AS `Total_Chargeable_Weight` "+
"FROM "+
  "`air_export_ff` "+

  "WHERE STR_TO_DATE(`MAWB_DATE`, '%y-%m-%d') BETWEEN  ? AND ?  AND "+
  "  `Register_Branch_Id` = ?" +
  " AND `Area` IN (1, 2, 3, 'JAPAN') "+
"GROUP BY "+
 " `Area`";
     
           
   ormdb.query(query,[req.body.fromDate,req.body.toDate,req.body.subBranch] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
//Ocean Import
exports.ffOimportALL= (req, res) => {
    console.log("this is ffOimportALL ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
          query = "SELECT * FROM `ocean_import_ff` WHERE Register_Branch_Id= ? AND Created_Date BETWEEN  ? AND  ? ;";
     
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
//Ocean Export
exports.ffOExportALL= (req, res) => {
    console.log("this is ffOExportALL ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
          query = "SELECT * FROM `ocean_export_ff` WHERE Register_Branch_Id= ? AND Created_Date BETWEEN  ? AND  ? ;";
     
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
 
  //**********************************  Custome BrokRage *************************** */
  //AIR  Import  Custome BrokRage
exports.chaAirImport= (req, res) => {
    console.log("this is AIR  Import  Custome BrokRage  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
          query = "SELECT * FROM `air_import_custom_brokerage` WHERE register_branch= ? AND Created_Date BETWEEN   ?  AND  ?   ;";
     
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
 
  //AIR  Export  Custome BrokRage
exports.chaAirExport= (req, res) => {
    console.log("this is AIR  Export  Custome BrokRage  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
          query = "SELECT * FROM `air_export_custom_brokerage` WHERE register_branch= ?   AND Created_Date BETWEEN   ?  AND  ?   ; ";
     
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
  //Ocean Import  
exports.chaOceanImport= (req, res) => {
    console.log("this is Ocean  Import  Custome BrokRage  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
          query = "SELECT * FROM `ocean_import_custom_brokerage` WHERE register_branch= ?   AND Created_Date BETWEEN   ?  AND  ?    ";
     
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
  //Ocean Export
exports.chaOceanExport= (req, res) => {
    console.log("this is chaOceanExport  Custome BrokRage  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
          query = "SELECT * FROM `ocean_export_custom_brokerage` WHERE register_branch= ?   AND Created_Date BETWEEN   ?  AND  ?    ;";
     
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
 
   //**********************************  Removals  *************************** */
  //AIR  Import
exports.RemovalsAirImport= (req, res) => {
    console.log("this is RemovalsAirImport  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
          query = "SELECT * FROM `air_import_removals` WHERE register_branch= ?   AND Created_Date BETWEEN   ?  AND  ?   ;";
     
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
 
  //RemovalsAirExport
exports.RemovalsAirExport= (req, res) => {
    console.log("this is RemovalsAirExport  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
    query = "SELECT * FROM `air_export_removals` WHERE register_branch= ?   AND Created_Date BETWEEN   ?  AND  ?   ;";
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
  //Ocean Import  
exports.RemovalsOceanImport= (req, res) => {
    console.log("this is RemovalsOceanImport  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
    query = "SELECT * FROM `ocean_import_removals` WHERE register_branch= ?   AND Created_Date BETWEEN   ?  AND  ?     ;";
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
 
  //Ocean Export
exports.RemovalsOceanExport= (req, res) => {
    console.log("this is RemovalsOceanExport  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
    query = "SELECT * FROM `ocean_export_removals` WHERE register_branch= ? AND Created_Date BETWEEN  ? AND  ? ;";
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };
 
  //RemovalsDomestic
exports.RemovalsDomestic= (req, res) => {
    console.log("this is RemovalsDomestic  ");
    const branch=req.body.BranchId;
    const from=req.body.from;
    const to=req.body.to;
 
   
    query = "SELECT * FROM `domestic_removals` WHERE register_branch= ? AND Created_Date BETWEEN  ? AND  ? ;";
   ormdb.query(query,[branch,from,to] , (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send("An error occurred while fetching data");
          } else {
              res.json(result);
          }
      });
  };