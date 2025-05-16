//core module
const path = require('path')
// External Module
const express = require("express");

// Local Modules
const userRouter = require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil")


const app = express();

app.set('view engine','ejs');
app.set('views','views') //ejs views ke folder pe lagate

// Middleware to parse form data
app.use(express.urlencoded({ extended: true })); // Fixed missing `extended: true`

// Use Routers
app.use("/", userRouter);
app.use("/host", hostRouter); // Routes correctly prefixed with "/"

app.use(express.static(path.join(rootDir,'public')))

//isme ordering imp hai agar mai isku upar shift kara to problem hojari ki agar home page pe bhi gaya to error wala code execute kardeta
app.use((req,res,next)=>{
  res.status(404).render('404',{pageTitle: 'Page not found'})
})



// Create server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
