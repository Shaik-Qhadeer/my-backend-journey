console.log('hello world')

const fs = require('fs')
fs.writeFile('output.txt',"writing File",(err) => { if(err) console.log('error occurred'); else console.log('File written successfully');})
console.log('File written successfully')
