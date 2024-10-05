const express = require('express');
const app=express();
const jwt = require('jsonwebtoken');
 
const login =require("../Routes/Login/Login");
 
 
 
 
app.post('/login', login.getAllData);
app.post('/Access', login.getAccess);
app.post('/update',login.updateData);
app.post('/subBranch',login.subranch);
app.post('/external',login.external); 
 
app.get('/authenticate', (req, res) => {
 
    console.log("this is Authentcation ");
    const { empid, psw } = req.query; // Retrieve empid and email from the query
 
        console.log("empid" ,empid);
        console.log("psw ",psw);
    // Validate empid and email
    if (empid && psw) {
        console.log("inside the condiiton ");
      // Generate the JWT
      const token = jwt.sign({ empid, psw }, 'NEIN_OR-MAnish', { expiresIn: '30m' });
     
      console.log("token "+token);
 
      // Redirect to React app with token
      res.redirect(`https://neinsoft1.nittsu.co.in:8185/login?token=${token}`);
    } else {
      res.status(400).send('Invalid credentials');
    }
  });
 
module.exports = app;