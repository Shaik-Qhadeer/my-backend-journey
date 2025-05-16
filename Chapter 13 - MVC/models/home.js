//core modules
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');



module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl){
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save(){
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDatapath = path.join(rootDir , 'data', 'homes.json');
      fs.writeFile(homeDatapath ,JSON.stringify(registeredHomes),
      error =>{
        console.log("File writing concluded : ",error);
    });

    }
  );

  }

  static fetchAll(callback){
    const homeDatapath = path.join(rootDir , 'data', 'homes.json');
    fs.readFile(homeDatapath , (err,data) =>{
      console.log("File read :",err,data);
      callback(!err ? JSON.parse(data) : []);

    })
  }
}

