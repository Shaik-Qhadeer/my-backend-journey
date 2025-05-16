//core modules
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const favouriteDatapath = path.join(rootDir , 'data', 'favourite.json');



module.exports = class Favourite {

  static addToFavourite(homeId,callback){
    Favourite.getFavourite((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is already marked favourite");

      } else {
        favourites.push(homeId);
          fs.writeFile(favouriteDatapath ,JSON.stringify(favourites), callback );

      }
    })

  }

  static getFavourite(callback){
    fs.readFile(favouriteDatapath , (err,data) =>{
         callback(!err ? JSON.parse(data) : []);
  })
 };

 static deleteById(delHomeId, callback) {
    Favourite.getFavourite(homeIds => {
      homeIds = homeIds.filter(homeId => delHomeId !== homeId);
      fs.writeFile(favouriteDatapath, JSON.stringify(homeIds), callback);
    })
  };

};







