//core module
const path = require('path')
// External Modules
const express = require('express');
const hostRouter = express.Router();

//Local Modules
const rootDir = require("../utils/pathUtil")

hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, 'views','addHome.html'))
});

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, '../', 'views','homeAdded.html'))
});

module.exports = hostRouter;