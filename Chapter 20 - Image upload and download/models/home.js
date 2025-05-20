const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');


const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true
  }
});

homeSchema.pre('findOneAndDelete', async function (next) {
  const homeId = this.getQuery()._id;
  await favourite.deleteMany({ houseId: homeId });
  next();
})
module.exports = mongoose.model("Home", homeSchema);