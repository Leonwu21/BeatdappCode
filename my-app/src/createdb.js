var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://leonwu21:l0E5o2N1@beatdapp-lw-kc3sv.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});