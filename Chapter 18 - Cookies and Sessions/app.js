// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://backend:backend123@backendlearning.gcktfxd.mongodb.net/airbnb?retryWrites=true&w=majority&appName=backendLearning";


//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const  authRouter  = require('./routes/authRouter');
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errorsController");
const { default: mongoose } = require("mongoose");



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDbStore({
  uri: DB_PATH,
  collection: 'sessions'
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'Code with Qhadeer',
  resave: false,
  saveUninitialized: false,
  store: store,
})
);

app.use((req, res, next) => {
  req.session.isLoggedIn = req.session.isLoggedIn
  next();
});


// Serve static files from the "public" directory
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  next();
});


// Use Routers
app.use(storeRouter);
app.use(authRouter);
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host",hostRouter);



// Error handling middleware for page not found
app.use(errorsController.pageNotFound);

// Create server

const PORT = 3000;
 mongoose.connect(DB_PATH).then(() =>{
  console.log('Connected to Mongo')
  app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  })

 }).catch(err => {
  console.log("Error while connecting to Mongo:",err)

 })

