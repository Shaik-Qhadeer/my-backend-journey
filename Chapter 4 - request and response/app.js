const http = require('http');

const server =http.createServer((req,res) =>{
  console.log(req.url, req.method, req.headers);
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Sever is listening at http://localhost:${PORT}`)
});