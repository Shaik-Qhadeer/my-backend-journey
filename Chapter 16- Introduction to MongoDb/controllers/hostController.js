const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
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
    });
  });
};

exports.getHostHomes = (req, res, next) => {
 Home.fetchAll().then(registeredHomes =>{
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
});
};

exports.postAddHome = (req, res, next) => {
  const { id,houseName, price, location, rating, photoUrl ,description} = req.body;
  const home = new Home(id,houseName, price, location, rating, photoUrl,description);
  home.save().then(() =>{
    console.log("home saved successfully")
  });

  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl,description} = req.body;
  const home = new Home(id,houseName, price, location, rating, photoUrl,description);
  home._id = id;
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = async (req, res) => {
  try {
    const homeId = req.params.homeId;

    if (!homeId) {
      return res.status(400).send("Missing home ID");
    }

    await Home.deleteById(homeId);
    res.redirect('/host/host-home-list');
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).send("Failed to delete home");
  }
};


