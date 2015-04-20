//var http = require('http');
var url = require("url");
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var turf = require("turf");
var util = require("util");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

fs.readFile("data.json", function(err, data){
  var listings = preparePoints(JSON.parse(data));

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
    var polygon = preparePolygon(req.body.points);
    var output = formatOutput(turf.within(listings, polygon));
    res.json(output);
  });

  app.listen(10002);
  console.log("server started");
});

function preparePoints(records) {
  var i, l, record;
  var features = [];

  for (i = 0, l = records.length; i < l; i++) {
    record = records[i];
    features.push({
      type: "Feature",
      properties: {
        record: record
      },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(record.latitude),
          parseFloat(record.longitude)
        ]
      }
    });
  }

  return {
    type: "FeatureCollection",
    features: features
  };
}

function preparePolygon(coordinates) {
  var i, l, coord;
  var points = [];

  for (i = 0, l = coordinates.length; i < l; i++) {
    coord = coordinates[i];
    points.push([parseFloat(coord.x), parseFloat(coord.y)]);
  }

  return {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [points]
        }
      }
    ]
  };
}

function formatOutput(turfOutput) {
  var i, l, record;
  var input = turfOutput.features;
  var output = [];

  for (i = 0, l = input.length; i < l; i++) {
    output.push(input[i].properties.record);
  }

  return output;
}
