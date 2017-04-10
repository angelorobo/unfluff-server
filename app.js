var express = require('express'),
    extractor = require('unfluff'),
    request = require('request'),
    http = require('http'),
    url = require('url'),
    app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Unfluff-server')
})

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
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})