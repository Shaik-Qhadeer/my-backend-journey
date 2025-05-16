// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require("mongoose");




const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // ejs views are located here

// Middleware to parse form data
app.use(express.urlencoded({ extended: false })); // Fixed missing `extended: true`

// Serve static files from the "public" directory
app.use(express.static(path.join(rootDir, 'public')));

// Use Routers
app.use(storeRouter);
app.use("/host", hostRouter); // Routes correctly prefixed with "/"

// Error handling middleware for page not found
app.use(errorsController.pageNotFound);

// Create server

const PORT = 3000;
const DB_PATH = "mongodb+srv://backend:backend123@backendlearning.gcktfxd.mongodb.net/airbnb?retryWrites=true&w=majority&appName=backendLearning"
 mongoose.connect(DB_PATH).then(() =>{
  console.log('Connected to Mongo')
  app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  })

 }).catch(err => {
  console.log("Error while connecting to Mongo:",err)

 })

