//core module
const path = require('path')
//External Modules
const express = require('express');
const userRouter = express.Router();

//Local Modules
const rootDir = require("../utils/pathUtil")

userRouter.get("/",(req,res,next)=>{
  console.log(req.url,req.method,req.body);
  res.sendFile(path.join(rootDir, 'views','home.html'))
});

module.exports = userRouter;