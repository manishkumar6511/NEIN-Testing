const express = require('express');
const app=express();
const Airimport =require("../Routes/freightForwarding/AirImport");
const AirExport =require("../Routes/freightForwarding/AirExport");
const OceanImport =require("../Routes/freightForwarding/OceanImport");
const OceanExport =require("../Routes/freightForwarding/OceanExport");


//Some common API 
app.get('/Industry', Airimport.getAllIndustry);
app.get('/User', Airimport.getAllUser);



//  air import
app.post('/ai_AllMaster', Airimport.getAllMaster);
app.post('/ai_masterData',Airimport.getMasterData);
app.post('/ai_insert',Airimport.InsertAExport);

app.post('/ai_AllHawb', Airimport.getAllHawb);
app.post('/ai_Hawb',Airimport.getHawbData);

app.post('/ae_Docket',AirExport.ae_Docket);
// //  air Export

app.post('/ae_AllMaster', AirExport.getAllMaster);
app.post('/ae_masterData',AirExport.getMasterData);
app.post('/ae_insert',AirExport.InsertAExport);
app.post('/ae_AllMasterFF',AirExport.getAllMasterFromFF);
app.post('/ae_masterDataFF',AirExport.getMasterDataFromFF);
app.post('/ae_UpdateDataFF',AirExport.UpdateDataFF);


// //  Ocean import
app.post('/oi_AllMaster', OceanImport.getAllMaster);
app.post('/oi_masterData',OceanImport.getMasterData);

app.post('/oi_insert',OceanImport.InsertOImport);


// //  Ocean export
app.post('/oe_AllMaster', OceanExport.getAllMaster);
app.post('/oe_masterData',OceanExport.getMasterData);

app.post('/oe_insert',OceanExport.InsertOExport);



module.exports = app;

