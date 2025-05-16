
const fs = require('fs');

const userRequestHandler = ((req, res) =>{
  console.log(req.url, req.method);
  if (req.url === '/'){
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

   }else if(req.url.toLowerCase() === '/submit-details' && req.method == "POST"){
      const body = []; //pehle ek body name ka array create kare fir jo bhi chunk me aara usku body me push karre
      req.on('data', chunk =>{
        console.log(chunk);
        body.push(chunk)
      });
      //jo bhi body me tha add karke string me convert karre aur full body name ke variable me store kardere
      req.on('end', ()=>{
        const fullBody =Buffer.concat(body).toString();
        console.log(fullBody);

        const params = new URLSearchParams(fullBody);//urlsearchparams ki help se decode karre wo chunks ku
        const jsonObject = {};//ek object create karre key value pairs me jo bhi data aara usku store karne ke liye
        //method 1:
        // for (const[key, value] of params.entries()){
        //   jsonObject[key] = value;
        // }
        //method 2:
        const bodyObject = Object.fromEntries(params);

        console.log(bodyObject); //jo bhi key value me aara usku console pe print karadere
        fs.writeFile('user.txt',JSON.stringify(bodyObject));
      });



      res.statusCode = 302;
      res.setHeader('Location', '/');

    }

});


module.exports = userRequestHandler;