const http = require('http');

const server =http.createServer((req,res) =>{
  console.log(req.url, req.method, req.headers);
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>');
  res.write('<head><title>Backend</title></head>');
  res.write('<body>');
  res.write('<form action="/submit-details" method="POST">');
  res.write('<input type="text"  name="Username" placeholder="Enter your name"> </br>');
  res.write('<label for="male">Male</label>')
  res.write('<input type="radio" id="male" name="gender" value="male" > </br>')
  res.write('<label for="female">Female</label>')
  res.write('<input type="radio" id="female" name="gender" value="female" > </br>')
  res.write('<input type = "submit" value="Submit">')
  res.write('</form>');
  res.write('</body>');
  res.write('</html>');

})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Sever is listening at http://localhost:${PORT}`)
});