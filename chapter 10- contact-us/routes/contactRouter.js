//core modules
const path = require('path')
// External Modules
const express = require('express');
const contactRouter = express.Router();

//Local Modules
const rootDir = require("../utils/pathUtil");


contactRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir,'views','contact-us.html'));
});

contactRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir,'views','contact-success.html'));
})


module.exports = contactRouter;