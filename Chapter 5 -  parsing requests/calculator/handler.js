const {sumRequestHandler}=require('./sum')
const requestHandler = (req,res) =>{
  console.log(req.url, req.method);
  if(req.url === '/'){
    res.setHeader('Content-Type', 'text-html')
    res.write(`<html lang="en">
    <head>
      <title>calculator</title>
    </head>
    <body>
      <h1>Welcome to calculator</h1>
      <a href="/calculator">Go to calculator</a>

    </body>
    </html>`);
    return res.end();

  }else if(req.url.toLowerCase() === '/calculator'){
    res.setHeader('Content-Type', 'text/html')
    res.write(`
    <html>
    <head>
      <title>calculator</title>
    </head>
    <body>
      <h1>Here is  the calculator</h1>
      <form action="/calculate-result" method="POST">
    <input type="text" name="first" placeholder="num1">
    <input type="text" name="second"  placeholder="num2">
    <input type="submit"  placeholder="sum" value="sum">
  </form>

    </body>
    </html>`);
    return res.end();


  }else if(req.url.toLowerCase() === '/calculate-result' && req.method ==='POST'){
     return sumRequestHandler(req, res);

  };
  res.setHeader('Content-Type', 'text-html')
    res.write(`
      <html>
    <head>
      <title>calculator</title>
    </head>
    <body>
      <h1>404 Page not found</h1>
      <a href="/">Go to Home</a>

    </body>
    </html>`);
    return res.end();


}

exports.requestHandler = requestHandler;