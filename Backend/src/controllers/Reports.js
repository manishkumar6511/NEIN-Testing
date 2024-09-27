const express = require('express');
const app=express();
// const Airimport =require("../Routes/freightForwarding/AirImport");
const report =require("../Routes/Reports/reports");
// const OceanImport =require("../Routes/freightForwarding/OceanImport");
// const OceanExport =require("../Routes/freightForwarding/OceanExport");
 
 
//FrightForword
 
//  air import
app.post('/ffAimportALL',report.ffAimportALL);
 
 
//   air Export
app.post('/aefRegister', report.getAllData);
app.post('/Comparison', report.getAllComparison);
app.post('/CWR', report.getCWR);
app.post('/getTop15', report.getTop15);
app.post('/getTopCarrier', report.getTopCarrier);
app.post('/PIC', report.getPIC);
app.post('/getSalesPIC', report.getSalesPIC);
app.post('/getAreaReport',report.getAreaReport) ;
 
//  Ocean import
 
app.post('/ffOimportALL',report.ffOimportALL);
 
 
//  Ocean export
 
app.post('/ffOExportALL',report.ffOExportALL);
 
//CUstom Brokrage ***************************************************************
 
//  air import
app.post('/chaAirImport',report.chaAirImport);
 
 
//   air Export
app.post('/chaAirExport',report.chaAirExport);
 
//  Ocean import
 
app.post('/chaOceanImport',report.chaOceanImport);
 
//  Ocean export
 
app.post('/chaOceanExport',report.chaOceanExport);
 
 
 
//Removals ***************************************************************
 
//  air import
app.post('/RemovalsAirImport',report.RemovalsAirImport);
 
 
//   air Export
app.post('/RemovalsAirExport',report.RemovalsAirExport);
 
 
//  Ocean import
app.post('/RemovalsOceanImport',report.RemovalsOceanImport);
 
 
 
//  Ocean export
app.post('/RemovalsOceanExport',report.RemovalsOceanExport);
 
//Domestic
app.post('/RemovalsDomestic',report.ffOExportALL);
 
 
 
 
module.exports = app;