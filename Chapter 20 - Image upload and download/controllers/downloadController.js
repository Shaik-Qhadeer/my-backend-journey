const Home = require("../models/home");

const downloadRules = async (req, res) => {
  const homeId = req.params.id;

  try {
    const homeData = await Home.findById(homeId);

    if (!homeData || !homeData.rules) {
      return res.status(404).send("No rules found for this house.");
    }

    res.setHeader("Content-Disposition", "attachment; filename=rules.txt");
    res.setHeader("Content-Type", "text/plain");
    res.send(homeData.rules);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { downloadRules };
