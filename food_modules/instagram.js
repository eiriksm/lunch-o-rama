/*
 * Instagram module for Lunch-o-rama.
 */


Instagram = require('instagram-node-lib');
var parser = require('../lib/instagram_parser.js');

var instaImage = {};

function getInstagrams(callback, config) {
  if (!config || !config.instaID || !config.instaSecret) {
    callback('Instagram credentials not provided.');
    return;
  }
  Instagram.set('client_id', config.instaID);
  Instagram.set('client_secret', config.instaSecret);

  Instagram.tags.recent({
    name: 'foodporn',
    complete: /* istanbul ignore next */ function(data) {
      parser.complete(data, callback);
    },
    error: function(errorMessage) {
      parser.error(errorMessage, callback);
    }
  });
}

module.exports = function(callback, config) {
  getInstagrams(callback, config);
};
