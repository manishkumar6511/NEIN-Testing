// require('dotenv').config();

// const https = require('https');
// const fs = require('fs');
// const express = require('express');
// const cors = require('cors');
// const cron = require('node-cron');

// const ff = require('./src/controllers/freightForwardController');
// const cha = require('./src/controllers/customBrokerageController');
// const dashboard = require('./src/controllers/DashboardController');
// const removals = require('./src/controllers/removalsController');
// const finance = require('./src/Listners/FinaceDataToDb');

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use('/ff', ff);
// app.use('/cha', cha);
// app.use('/dashboard', dashboard);
// app.use('/removals', removals);
// app.use('/finance', finance);

// cron.schedule('27 16 * * *', () => {
//     console.log('Running scheduled task at 16:27 (4:27 PM)');
//     // processRemoteFile();
// });

// const options = {
//     key: fs.readFileSync(process.env.SSL_KEY_PATH),
//     cert: fs.readFileSync(process.env.SSL_CERT_PATH)
// };

// https.createServer(options, app).listen(process.env.PORT, () => {
//     console.log(`Server is started on https://localhost:${process.env.PORT}`);
// });


const express = require('express');
const fs = require('fs');
const cors = require('cors');
const cron = require('node-cron');
const https = require('https');

// Import your controllers
const ff = require('./controllers/freightForwardController');
const cha = require('./controllers/customBrokerageController');
const dashboard = require('./controllers/DashboardController');
const removals = require('./controllers/removalsController');
const finance = require('./Listners/FinaceDataToDb');
const Reports=require('./controllers/Reports');
const login= require('./controllers/Login');
 const Help=require('./controllers/Help');
// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Routes
app.use('/ff', ff);
app.use('/cha', cha);
app.use('/dashboard', dashboard);
app.use('/removals', removals);
app.use('/finance', finance);
app.use('/Reports',Reports);
app.use('/User',login);
app.use('/Help',Help);

// Cron job (adjust as needed)
cron.schedule('27 16 * * *', () => {
  console.log('Running scheduled task at 16:27 (4:27 PM)');
});


// Check the environment
console.log('NODE_ENV:', process.env.NODE_ENV);

// Start server based on environment
if (process.env.NODE_ENV === 'production') {
  // HTTPS for production
  const options = {
    key: fs.readFileSync('C:/Users/neinuat/key.pem'),
    cert: fs.readFileSync('C:/Users/neinuat/cert.pem'),
	ca: fs.readFileSync('C:/Users/neinuat/chain.pem')
  };

  https.createServer(options, app).listen(5000, (err) => {
    if (err) {
      console.error('Failed to start HTTPS server:', err);
    } else {
      console.log('HTTPS Server running on port 5000');
    }
  });
}
 else {
  // HTTP for development
  app.listen(5000, () => {
    console.log('HTTP Server running on port 443');
  });
}