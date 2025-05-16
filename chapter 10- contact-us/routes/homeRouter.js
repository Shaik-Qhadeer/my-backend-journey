//core modules
const path = require('path')
// External Modules
const express = require('express');
const homeRouter = express.Router();

//Local Modules
const rootDir = require("../utils/pathUtil")

homeRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir,'views','home.html'));
})

module.exports = homeRouter;