// Core module
const path = require('path');

// External Module
const express = require("express");

// Local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const {mongoConnect} = require('./utils/databaseUtil');




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
mongoConnect(() => {
  app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  });
});

