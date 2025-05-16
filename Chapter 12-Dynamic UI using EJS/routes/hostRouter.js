//core module
const path = require('path')
// External Modules
const express = require('express');
const hostRouter = express.Router();

//Local Modules
const rootDir = require("../utils/pathUtil")

hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome',{pageTitle : 'Add Home to airbnb'})
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log('Home Registeration successful for :',req.body,req.body.houseName);
  registeredHomes.push({houseName :req.body.houseName});
  res.sendFile(path.join(__dirname, '../', 'views','homeAdded.html'))
  res.render('homeAdded',{pageTitle : ' Home Added successfully'})
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;

//pehle jo kuch bhi add home me aara usku ek variable(registeredHomes) me store kare uske baad usku export kardiye