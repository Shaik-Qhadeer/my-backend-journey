//core modules
const path = require('path')

// External Module
const express = require('express');
const homeRouter = require('./routes/homeRouter');
const contactRouter = require('./routes/contactRouter');

//Local Modules
const rootDir = require("./utils/pathUtil");

const app = express();

app.use(express.urlencoded());

app.use(homeRouter);
app.use(contactRouter)

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(rootDir,  'views','404.html'))
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});