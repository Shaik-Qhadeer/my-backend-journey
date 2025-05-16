//core module
const path = require('path')
// External Module
const express = require("express");

// Local Modules
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil")


const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true })); // Fixed missing `extended: true`

// Use Routers
app.use("/", userRouter);
app.use("/host", hostRouter); // Routes correctly prefixed with "/"

app.use(express.static(path.join(rootDir,'public')))

//isme ordering imp hai agar mai isku upar shift kara to problem hojari ki agar home page pe bhi gaya to error wala code execute kardeta
app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(__dirname,  'views','404.html'))
})



// Create server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
