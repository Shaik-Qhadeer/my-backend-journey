const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) =>{
     res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  });
};

exports.getHomes = (req, res, next) => {
 Home.fetchAll().then(([registeredHomes]) =>{
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
});
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite(favourites => {
    Home.fetchAll().then(([registeredHomes]) =>{
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};


exports.postAddToFavourites = (req,res,next) =>{
  console.log("Came to add to Favourites",req.body);
  Favourite.addToFavourite(req.body.id, error =>{
    if(error){
      console.log("Error while marking favourite :",error)
    }
    res.redirect("/favourites");

  });
}
exports.postRemoveFromFavourites = (req,res,next) =>{
 const homeId = req.params.homeId;
 Favourite.deleteById(homeId ,error =>{
  if(error){
    console.log("Error while removing from Favourite")
  }
  res.redirect("/favourites")
 })
}


exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page", homeId);

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("Home not Found");
      return res.redirect("/homes");
    }

    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      currentPage: "Home",
    });
  });
};
