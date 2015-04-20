var http = require('http');
var url = require('url');
var fs = require('fs');

fs.readFile("data.js", function(err, data){
  var listings = JSON.parse(data);

  http.createServer(function (req, res) {
    res.end()
  }).listen(8000);
});
