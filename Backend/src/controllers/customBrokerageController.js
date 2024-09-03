const express = require('express');
const app=express();
const ChaAirimport =require("../Routes/customBrokerage/CHA_AirImport");
const ChaAirExport =require("../Routes/customBrokerage/Cha_AirExport");
const ChaOceanImport =require("../Routes/customBrokerage/Cha_OceanImport");
const ChaOceanExport =require("../Routes/customBrokerage/Cha_OceanExport");

//  air import
app.post('/ai_JobData',ChaAirimport.getJobData);
app.post('/ai_jobinsert',ChaAirimport.InsertChaAimport);


// // //  air Export
app.post('/ae_JobData',ChaAirExport.getJobData);
app.post('/ae_jobinsert',ChaAirExport.InsertChaExport);

// // //  Ocean import
app.post('/oi_JobData',ChaOceanImport.getJobData);
app.post('/oi_jobinsert',ChaOceanImport.InsertChaOimport);

// // //  Ocean export
app.post('/oe_JobData',ChaOceanExport.getJobData);
app.post('/oe_jobinsert',ChaOceanExport.InsertChaOExport);

module.exports = app;

