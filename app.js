var express = require('express'),
    extractor = require('unfluff'),
    request = require('request'),
    http = require('http'),
    url = require('url'),
    test = require('assert'),
    app = express();

const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  // Setup cors headers.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*
  Routes
*/
app.get('/', function (req, res) {
  res.send('Unfluff-server')
});

app.get('/unfluff', function (req, res){
  var unfluff_url = req.query.url; 

  request(unfluff_url, (error, response, html)=>{
    if (!error){
      var data = extractor(html);
      res.json(data);
    } else {
      res.json({
        error: error
      });
    }
  });
});

app.listen(port, function () {
  console.log('ufluff listening on ' + port);
});
