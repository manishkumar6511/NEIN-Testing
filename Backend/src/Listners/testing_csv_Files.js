const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Path to your CSV file
const filePath = path.join(__dirname, 'Invoice Charge Details Download - NIN (3).csv');

// Array to hold the data
const results = [];

// Reading the CSV file
fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => {
    // Process each row of data here
    results.push(data);
    console.log(data['Master Airway Bill No.   '])
  })
  .on('end', () => {
    // This is where you can work with the parsed data
    console.log(results);

    // You can now process the data, insert it into a database, etc.
  })
  .on('error', (error) => {
    // Handle any errors that occur during the read process
    console.error('An error occurred:', error.message);
  });
