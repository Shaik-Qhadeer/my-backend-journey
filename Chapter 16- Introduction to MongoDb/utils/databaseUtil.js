const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://backend:backend123@backendlearning.gcktfxd.mongodb.net/?retryWrites=true&w=majority&appName=backendLearning";

let _db;

const mongoConnect = (Callback) => {
  MongoClient.connect(MONGO_URL)
  .then((client) =>{
    console.log("Connected to MongoDB");
    _db = client.db('airbnb')
    Callback()
  })
  .catch(err => {
    console.log('Error while conneccting to Mongo',err);
  })
}

const getDB = () => {
  if(!_db){
    throw new Error("Database not connected")
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
