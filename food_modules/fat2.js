'use strict';
var request = require('request'),
  cheerio = require('cheerio');

var urls = [
  'http://thatiswhyyourefat.tumblr.com'
];

var i = 2;
while (i < 65) {
  urls.push('http://thatiswhyyourefat.tumblr.com/page/' + i);
  i++;
}

var randomUrl = function() {
  return urls[Math.floor(Math.random() * (urls.length))];
};

var doRequest = function(url, callback) {
  request({url: url}, function(error, response, body) {
    var $ = cheerio.load(body);
    var imgs = $('.post .media img');
    /* istanbul ignore next */
    if (!imgs) {
      callback('none found');
      return;
    }

    // Find a random one of these images.
    var img = imgs[Math.floor(Math.random() * imgs.length)];
    /* istanbul ignore next */
    if (!img || !img.attribs.src) {
      callback('error');
      return;
    }

    // Compose some text to use.
    var text = (img.attribs.alt ? /* istanbul ignore next */ img.attribs.alt : '') + '<img src="' + img.attribs.src + '" />';
    callback(null, text, "http://thatiswhyyourefat.tumblr.com/");
  });
};

module.exports = function(callback) {
  doRequest(randomUrl(), callback);
};
