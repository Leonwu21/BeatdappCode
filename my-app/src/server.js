const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongodb = require('mongodb');
const dbConn = mongodb.MongoClient.connect('mongodb+srv://leonwu21:l0E5o2N1@beatdapp-lw-kc3sv.mongodb.net/test?retryWrites=true&w=majority');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://leonwu21:l0E5o2N1@beatdapp-lw-kc3sv.mongodb.net/test?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/get', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).json(result);
      db.close();
    });
  });
});


app.post('/post', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").insertOne(req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
  });
});

app.listen(process.env.PORT || 5000, process.env.IP || '0.0.0.0');