const express= require('express');
const app= express();
 const cors=require('cors');    
 const cron = require('node-cron');
       

const ff=require('./src/controllers/freightForwardController');
const cha=require('./src/controllers/customBrokerageController');
const dashboard=require('./src/controllers/DashboardController');
const removals=require('./src/controllers/removalsController');
const finance=require('./src/Listners/FinaceDataToDb');
const Reports=require('./src/controllers/Reports');


app.use(express.json());
app.use(cors());

app.use('/ff', ff);
app.use('/cha', cha);
app.use('/dashboard',dashboard);
app.use('/removals',removals);
app.use('/finance',finance);
app.use('/Reports',Reports);





cron.schedule('27 16 * * *', () => {
    console.log('Running scheduled task at 16:23 (4:23 PM)');
   // processRemoteFile();
});

app.listen(5000, () => {
    console.log("Server Is started");
});

