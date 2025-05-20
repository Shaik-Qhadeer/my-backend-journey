const home = require("../models/home");
const Home = require("../models/home");
const user = require("../models/user");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
     user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
 Home.find().then(registeredHomes =>{
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
       user: req.session.user,
    })
});
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating,description} = req.body;
  console.log(houseName, price, location, rating,description);
  console.log(req.file);

  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const photo = req.file.path;



  const newHome = new Home ({
    houseName: houseName,
    price: price,
    location: location,
    rating: rating,
    photo: photo,
    description:description
  });
  newHome.save().then(() => {
    console.log("Home saved successfully");
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photo,description} = req.body;
  Home.findById(id).then(home => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.description=description;

    if (req.file) {
      fs.unlink(home.photo, (err) => {
        if (err) {
          console.log("Error deleting old photo:", err);
        } else {
          console.log("Old photo deleted successfully");
        }
      });
      home.photo = req.file.path;
    }


    return home.save();
  }).then(() => {
    console.log("Home updated successfully");
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while updating home:", err);
  });

};

exports.postDeleteHome = async (req, res) => {
  const homeId = req.params.homeId;
  console.log("Deleting home with ID:", homeId);
  Home.findByIdAndDelete(homeId).then(() => {
    console.log("Home deleted successfully");
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while deleting home:", err);
  });
};


