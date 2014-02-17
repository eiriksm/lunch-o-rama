'use strict';
var fs = require('fs'),
  crypto = require('crypto'),
  Lunchword = require('./lunchwords'),
  Message = require('./message'),
  request = require('request'),
  fmodules = require('../food_modules');

var config;
try {
  config = require('../config');
}
catch (err) {
  config = {};
}

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

var moduleCallback = function(err, text, source) {
  // Make random module again, in case we want to try again.
  randomModule = getModule();
  if (err) {
    // Oops. Try another random one.
    randomModule(moduleCallback);
    return;
  }
  // Create an ID to control if we have used this before.
  var id = crypto.createHash('md5').update(text).digest("hex");
  fs.readFile('data', 'utf-8', function(err, data) {
    if (err) {
      // Meh, probably just doesnt exist.
      data = '{}';
    }
    if (data.length === 0) {
      // Short data, man.
      data = '{}';
    }
    var json = JSON.parse(data);
    if (json[id]) {
      // Already have this. Try again.
      randomModule(moduleCallback);
      return;
    }
    json[id] = {text: text, source: source};
    fs.writeFile('data', JSON.stringify(json, null, 4), function (err) {
      // Let's just do it async and not anything else.
    });
    var mention = new Message(new Lunchword().word +
      '. How about this (taken from ' + source + '):');
    mention.post();
    var pic = new Message(text, true);
    pic.post();
  });
};

module.exports = function() {
  randomModule(moduleCallback, config);
};
