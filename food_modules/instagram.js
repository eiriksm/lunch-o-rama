/*
 * Instagram module for Lunch-o-rama.
 */


Instagram = require('instagram-node-lib');
var config;
try {
  config = require('../config');
}
catch (err) {
  config = {};
}

var instaImage = {};

function getInstagrams(callback) {
  if (!config.instaID || !config.instaSecret) {
    callback('Instagram credentials not provided.');
    return;
  }
  Instagram.set('client_id', config.instaID);
  Instagram.set('client_secret', config.instaSecret);

  Instagram.tags.recent({
    name: 'foodporn',
    complete: function(data){
      var pic = Math.floor(Math.random() * data.length);
  
      instaImage.url = data[pic].images.standard_resolution.url;
      instaImage.text = data[pic].caption.text;
      instaImage.source = data[pic].link;
      callback(null, instaImage.text + ' <img src="' + instaImage.url + '" />', instaImage.source);
    },
    error: function(errorMessage, errorObject, caller) {
      callback(errorMessage);
    }
  });
}

module.exports = function(callback) {
  getInstagrams(callback);
}
