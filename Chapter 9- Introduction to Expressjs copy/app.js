// const express = require("express");

// const app = express();

// // First Middleware (Logs request)
// app.use("/", (req, res, next) => {
//   console.log("this is first middleware", req.url, req.method);
//   next(); // Move to the next middleware
// });

// // Second Middleware (Logs a message)
// app.use("/submit-details", (req, res, next) => {
//   console.log("this is second middleware", req.url, req.method);
//   res.send("<p>Welcome back Qhadeer</p>");
// });

// // Create server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });