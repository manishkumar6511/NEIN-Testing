const express = require('express');


const router = express.Router();
const AirExportDahboard =require("../Routes/Dashboard/Dashboard");


router.post('/AirImport', AirExportDahboard.AirImportDahboard);
router.post('/AirExport', AirExportDahboard.AirExportDahboard);
router.post('/OceanImport', AirExportDahboard.OceanImportDahboard);
router.post('/OceanExport', AirExportDahboard.OceanExportDahboard);
router.post('/AirImporttFF', AirExportDahboard.AirImporttFF);


module.exports = router;