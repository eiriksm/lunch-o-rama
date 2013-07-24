'use strict';
var config = require('./config'),
  fs = require('fs'),
  crypto = require('crypto'),
  Lunchword = require('./lunchwords'),
  Message = require('./message'),
  request = require('request'),
  fmodules = require('./food_modules');

var getModule = function() {
  var result;
  var count = 0;
  for (var prop in fmodules) {
    if (fmodules.hasOwnProperty(prop)) {
      if (Math.random() < 1/++count) {
        result = prop;
      }
    }
  }
  return fmodules[result];
};

var randomModule = getModule();

var moduleCallback = function(text, source) {
  // Create an ID to control if we have used this before.
  var id = crypto.createHash('md5').update(text).digest("hex");
  fs.readFile('data', 'utf-8', function(err, data) {
    if (err) {
      // Meh, probably just doesnt exist.
      data = '{}';
    }
    var json = JSON.parse(data);
    if (json[id]) {
      randomModule(moduleCallback);
      return;
    }
    json[id] = {text: text, source: source};
    fs.writeFile('data', JSON.stringify(json, null, 4), function (err) {
      // Let's just do it async and not anything else.
    });
    var mention = new Message(new Lunchword().word +
      '. How about this (taken from thisiswhyyourefat.com):');
    mention.post();
    var pic = new Message(text, true);
    pic.post();
  });
};

randomModule(moduleCallback);
