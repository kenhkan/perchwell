//var http = require('http');
var url = require("url");
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

fs.readFile("data.json", function(err, data){
  var listings = JSON.parse(data);

  app.get("/", function (req, res) {
    fs.readFile("./index.html", function (err, data) {
      res.end(data);
    });
  });

  app.get("/index.html", function (req, res) {
    fs.readFile("./index.html", function (err, data) {
      res.end(data);
    });
  });

  app.get("/client.js", function (req, res) {
    fs.readFile("./client.js", function (err, data) {
      res.end(data);
    });
  });

  app.post("/find-listings", function (req, res) {
    console.log("polygon!", req.body);
    res.json(req.body);
  });

  app.listen(10002);
  console.log("server started");
});
