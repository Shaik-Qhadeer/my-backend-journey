const http = require('http');

const server =http.createServer((req,res) =>{
  console.log(req.url, req.method, req.headers);
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>');
  res.write('<head><title>Backend</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');

})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Sever is listening at http://localhost:${PORT}`)
});