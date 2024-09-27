const express = require('express');
const app=express();
 
 
 
 
 
app.post('/send',(req,res)=>{
 
    console.log("this is help ");
 
    console.log(req.body);
});
 
 
module.exports = app;