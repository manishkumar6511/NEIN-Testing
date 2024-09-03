const express = require('express');
const app=express();
const RemovalsAirimport =require("../Routes/Removals/Air_Import_Removals");
const RemovalsAirExport =require("../Routes/Removals/Air_Export_Removals");
const RemovalsOceanImport =require("../Routes/Removals/Ocean_Import_Removals");
const RemovalsOceanExport =require("../Routes/Removals/Ocean_Export_Removals");
const RemovalsDomastic =require("../Routes/Removals/Domastic");

//  air import
//app.post('/ai_JobData',RemovalsAirimport.getJobData);
app.post('/ai_jobinsert',RemovalsAirimport.InsertAimportRemovals);


// // //  air Export
//app.post('/ae_JobData',RemovalsAirExport.getJobData);
app.post('/ae_jobinsert',RemovalsAirExport.InsertAirExportRemovals);

// // //  Ocean import
//app.post('/oi_JobData',RemovalsOceanImport.getJobData);
app.post('/oi_jobinsert',RemovalsOceanImport.InsertOceanImportRemovals);

// // //  Ocean export
//app.post('/oe_JobData',RemovalsOceanExport.getJobData);
app.post('/oe_jobinsert',RemovalsOceanExport.InsertOceanExportRemovals);


//domastic
app.post('/Domestic_jobinsert',RemovalsDomastic.InsertDomasticRemovals);





module.exports = app;

