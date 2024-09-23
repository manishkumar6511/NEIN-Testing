const Client = require('ssh2-sftp-client');
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
const { parse } = require('csv-parse/sync');

const sftp = new Client();
const sftpConfig = {
  host: 'neincloudftp.nittsu.co.in',
  port: '22',
  username: 'neinsoft',
  password: 'Super*@123'
};

async function processFiles() {
  try {
    console.log('Attempting to connect to SFTP...');
    await sftp.connect(sftpConfig);
    console.log('SFTP connection established successfully!');

    const remoteDir = '/FTP/Operation Register/NEWINS';
    
    // Get list of files from the directory
    const fileList = await sftp.list(remoteDir);
    console.log('Files retrieved:', fileList.map(file => file.name));
    
    // Filter only files that start with 'AIR_EXPORT'
    const airExportFiles = fileList.filter(file => file.name.startsWith('AIR_EXPORT'));

    for (const file of airExportFiles) {
      const remoteFilePath = `${remoteDir}/${file.name}`;

      // Get current date info (year, month, date, hour)
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const date = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      
      // Construct directory structure - using E: directly for absolute path
      const localDir = path.join('E:', 'neinSoft', 'files', 'Nippon-OR', 'NEWINS', String(year), month, date, hour);
      
      // Create the directories if they don't exist
      await fs.mkdir(localDir, { recursive: true });
      console.log('Directory created successfully:', localDir);

      // Set the full local file path
      const localFilePath = path.join(localDir, file.name);
      
      // Download the file from SFTP and store it in the respective directory
      await sftp.get(remoteFilePath, localFilePath);
      
      console.log(`File saved: ${localFilePath}`);

      // Read the file (assuming it's a CSV or similar)
      const fileData = await fs.readFile(localFilePath, 'utf8');
      
      // Process each row and insert or update in the DB
      await processDataInDB(fileData);
    }
  } catch (err) {
    console.error('Error processing files:', err);
    console.error('Error message:', err.message);
  } finally {
    await sftp.end();
    console.log('SFTP connection closed.');
  }
}

async function processDataInDB(fileData) {
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'your_database',
//     password: 'your_password'
//   });

  const rows = parseFileData(fileData);

  for (const row of rows) {
    console.log('Processing row:', row);
    
    // Perform validation checks here
    const isValid = validateRow(row);
    if (!isValid) {
      console.warn('Skipping invalid row:', row);
      continue;
    }

    // const masterNumber = row.MasterNumber; // Adjust according to your data
    // const [existing] = await connection.execute(
    //   'SELECT * FROM your_table WHERE MasterNumber = ?',
    //   [masterNumber]
    // );

    // if (existing.length > 0) {
    //   // Update existing row
    //   await connection.execute(
    //     'UPDATE your_table SET column1 = ?, column2 = ? WHERE MasterNumber = ?',
    //     [row.column1, row.column2, masterNumber]
    //   );
    // } else {
    //   // Insert new row
    //   await connection.execute(
    //     'INSERT INTO your_table (MasterNumber, column1, column2) VALUES (?, ?, ?)',
    //     [masterNumber, row.column1, row.column2]
    //   );
    // }
  }

  await connection.end();
}

function parseFileData(fileData) {
  console.log("Parsing data...");

  // Parsing the CSV with all column names
  const records = parse(fileData, {
    columns: true,  // Use headers from the first row
    skip_empty_lines: true,  // Skip empty lines
    trim: true,  // Trim whitespace from fields
    relax_column_count: true  // Allow variable number of columns
  });

  console.log("Parsed records:", records);

  return records.map(record => ({
    BRANCH: record['BRANCH'] || '',
    DIVISION: record['DIVISION'] || '',
    AWBCarrierCode: record['AWB CARRIER CODE'] || '',
    AWBBLNo: record['AWB B/L NO.'] || '',
    CarrierCode: record['CARRIER CODE'] || '',
    RecordType: record['RECORD TYPE'] || '',
    PelicanFlag: record['PELICAN FLAG'] || '',
    RefNoBrDv: record['REF. NO. (BR-DV)'] || '',
    RefNoSeq: record['REF. NO. (SEQ.)'] || '',
    MAWBCarrierNo: record['MAWB CARRIER NO.'] || '',
    MAWBBLNo: record['MAWB B/L NO.'] || '',
    MAWBCarrierCode: record['MAWB CARRIER CODE'] || '',
    ManifestType: record['MANIFEST TYPE'] || '',
    BLIssueDateYear: record['B/L ISSUE DATE YEAR'] || '',
    BLIssueDateMonth: record['B/L ISSUE DATE MONTH'] || '',
    BLIssueDateDay: record['B/L ISSUE DATE DAY'] || '',
    MasterHouseCarrier: record['MASTER HOUSE CARRIER'] || '',
    MasterHouseBL: record['MASTER HOUSE B/L'] || '',
    DepartureCity: record['DEPARTURE CITY'] || '',
    DestinationCity: record['DESTINATION CITY'] || '',
    DestinationCountry: record['DESTINATION COUNTRY'] || '',
    CoLoadToAgentCourierCode: record['CO-LOAD TO AGENT OR COURIER CODE'] || '',
    ConsigneeCode: record['CONSIGNEE CODE'] || '',
    ConsigneeName: record['CONSIGNEE NAME'] || '',
    ShipperCode: record['SHIPPER CODE'] || '',
    ShipperName: record['SHIPPER NAME'] || '',
    FreeHouseSign: record['FREE HOUSE SIGN'] || '',
    TotalNoOfPkgs: record["TOTAL NO. OF P'KGS"] || '',
    TotalActualWeight: record['TOTAL ACTUAL WEIGHT'] || '',
    FreightPCSign: record['FREIGHT P/C SIGN'] || '',
    FreightPP: record['FREIGHT PP'] || '',
    FreightCC: record['FREIGHT CC'] || '',
    ChargeTotalPP: record['CHARGE TOTAL PP'] || '',
    ChargeTotalCC: record['CHARGE TOTAL CC'] || '',
    BLConsoDateYear: record['B/L CONSO DATE YEAR'] || '',
    BLConsoDateMonth: record["B/L CONSOL'DATE MONTH"] || '',
    BLConsoDateDay: record["B/L CONSOL'DATE DAY"] || '',
    TotalChargeableWgt: record['TOTAL CHARGEABLE WGT'] || '',
    FlightCarrierCode: record['FLIGHT CARRIER CODE'] || '',
    FlightNo1: record['FLIGHT NO. 1'] || '',
    FlightDepartureDay: record['FLIGHT DEPARTURE DAY'] || '',
    FuelSurCharge: record['FUEL SUR CHARGE'] || '',
    SecuritySurCharge: record['SECURITY SUR CHARGE'] || '',
    Total2: record['TOTAL(2)'] || '',
    SupplierIV: record['SUPPLIER I/V'] || '',
    PONo: record['P/O NO'] || '',
    PPInvNo: record['PP INV NO'] || '',
    CCInvNo: record['CC INV NO'] || '',
    AgreedRate: record['AGREED RATE'] || '',
    CurrencyOfFreight: record['CURRENCY OF FREIGHT'] || '',
    FreightRate: record['FREIGHT RATE'] || '',
    DescriptionOfGoods: record['DESCRITION OF GODD'] || '',
    AWAChargeAmtAgent: record['AWA CHARGE AMT-AGENT'] || '',
    MCCChargeAmtCarri: record['MCC CHARGE AMT-CARRI'] || '',
    MYCChargeAmtCarri: record['MYC CHARGE AMT-CARRI'] || '',
    XBCChargeAmtCarri: record['XBC CHARGE AMT-CARRI'] || '',
    TRCChargeAmtCarri: record['TRC CHARGE AMT-CARRI'] || ''
  }));
}

function validateRow(row) {
  // Implement your validation logic here
  // For example, check if required fields are present
  const requiredFields = [
    'BRANCH', 'DIVISION', 'AWBCarrierCode', 'AWBBLNo', 'CarrierCode', 
    'RecordType', 'PelicanFlag', 'RefNoBrDv', 'RefNoSeq', 'MAWBCarrierNo', 
    'MAWBBLNo', 'MAWBCarrierCode', 'ManifestType', 'BLIssueDateYear', 
    'BLIssueDateMonth', 'BLIssueDateDay', 'MasterHouseCarrier', 
    'MasterHouseBL', 'DepartureCity', 'DestinationCity', 'DestinationCountry', 
    'CoLoadToAgentCourierCode', 'ConsigneeCode', 'ConsigneeName', 
    'ShipperCode', 'ShipperName', 'FreeHouseSign', 'TotalNoOfPkgs', 
    'TotalActualWeight', 'FreightPCSign', 'FreightPP', 'FreightCC', 
    'ChargeTotalPP', 'ChargeTotalCC', 'BLConsoDateYear', 
    'BLConsoDateMonth', 'BLConsoDateDay', 'TotalChargeableWgt', 
    'FlightCarrierCode', 'FlightNo1', 'FlightDepartureDay', 
    'FuelSurCharge', 'SecuritySurCharge', 'Total2', 'SupplierIV', 
    'PONo', 'PPInvNo', 'CCInvNo', 'AgreedRate', 'CurrencyOfFreight', 
    'FreightRate', 'DescriptionOfGoods', 'AWAChargeAmtAgent', 
    'MCCChargeAmtCarri', 'MYCChargeAmtCarri', 'XBCChargeAmtCarri', 
    'TRCChargeAmtCarri'
  ];

  for (const field of requiredFields) {
    if (!row[field]) {
      console.warn(`Missing value for required field: ${field}`);
      return false;
    }
  }

  // Additional validation rules can be added here
  
  return true;
}

processFiles();
