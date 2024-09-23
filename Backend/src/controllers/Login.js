const express = require('express');
const app=express();

const login =require("../Routes/Login/Login");




app.post('/login', login.getAllData);
app.post('/Access', login.getAccess);
app.post('/update',login.updateData);
app.post('/subBranch',login.subranch);

module.exports = app;

