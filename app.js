var express = require('express'),
    extractor = require('unfluff'),
    request = require('request'),
    http = require('http'),
    url = require('url'),
    mongo = require('mongodb'),
    test = require('assert'),
    app = express();

const port = 3000;
const db_name = "reddit";
const mongo_url = "mongodb://mongo:27017/" + db_name;


app.use(function(req, res, next) {
  // Setup cors headers.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
  // Add the db to the router.
  mongo.connect(mongo_url, function(err, db) {
    req.db = db;
    next();
  });
});

/*
  Database Functions
*/

var find_url = function(db, url, callback){
  // If the url is in the database, return whatever json blob you get.
  var collection = db.collection('unfluff');
  collection.findOne({url:url}, {}, (err, doc)=>{
    callback(doc);
  });
}
var insert_url = function(db, url, blob, callback){
  var collection = db.collection('unfluff');
  collection.insertOne({
    url: url, 
    blob: blob
  }, {}, callback);
}
/*
  Routes
*/

app.get('/', function (req, res) {
  res.send('Unfluff-server')
});

app.get('/unfluff', function (req, res){
  var unfluff_url = req.query.url; 

  find_url(req.db, unfluff_url, (result)=>{
    if (result != null){
      res.json(result.blob);
    } else {
      request(unfluff_url, (error, response, html)=>{
        if (!error){
          var data = extractor(html);
          insert_url(req.db, unfluff_url, data, ()=>{
            console.log("Inserted " + unfluff_url);
          });
          res.json(data);
        } else {
          res.json({
            error: error
          });
        }
      });
    }
  });
});

app.get('/twitter', function (req, res) {
  var twitter_url = req.query.url;
  var oEmbed_url = "https://publish.twitter.com/oembed?url=";
  request(oEmbed_url + twitter_url, (error, response, jason)=>{
    if (!error){
      var parsed = JSON.parse(jason);
      res.json(parsed);
    } else {
      res.json({
        error: error
      });
    }
  });
});

app.listen(port, function () {
  console.log('redditAccessible ufluff listening on ' + port);
});