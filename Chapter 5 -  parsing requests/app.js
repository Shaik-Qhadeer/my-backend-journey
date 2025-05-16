const http = require('http');
const requestHandler = require('./user'); //realtive path deke user.js file ku access kar sakte
const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () =>{
  console.log(`server is running at http://localhost:${PORT}`);
  console.log('this is the practice message');
  console.log('this is the practice message 2');
});

//module.exports using object
// module.export ={
//   handler: requestHandler;
//   extra : "Extra"
// }
//shortcut
//exports.handler = requestHandler;