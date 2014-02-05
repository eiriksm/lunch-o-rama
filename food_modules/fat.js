'use strict';
var request = require('request');
var urls = [
  'http://thisiswhyyourefat.kinja.com/api/frontpage',
  'http://thisiswhyyourefat.kinja.com/api/tag/sandwiches',
  'http://thisiswhyyourefat.kinja.com/api/tag/burgers',
  'http://thisiswhyyourefat.kinja.com/api/tag/pies',
  'http://thisiswhyyourefat.kinja.com/api/tag/pizza',
  'http://thisiswhyyourefat.kinja.com/api/tag/burritos',
  'http://thisiswhyyourefat.kinja.com/api/tag/tacos',
  'http://thisiswhyyourefat.kinja.com/api/tag/cakes',
  'http://thisiswhyyourefat.kinja.com/api/tag/bacon'
];

var randomUrl = function() {
  return urls[Math.floor(Math.random() * (urls.length))];
};

var UrlObj = function(url, params) {
  this.url = url;
  this.params = params || '?maxReturned=10';
};

var doRequest = function(url, callback) {
  request({url: url.url + url.params}, function(error, response, body) {
    var data = JSON.parse(body);
    // Determine if we want to use pagination.
    if (data.data.items.length > 0 &&
        data.data.pagination.nextPage && Math.floor(Math.random() * 2) === 1) {
      // Eh, let's do it again.
      doRequest(new UrlObj(url.url, '?' + data.data.pagination.nextPage), callback);
      return;
    }
    if (data.data.items.length === 0) {
      doRequest(new UrlObj(randomUrl()), callback);
    }
    var random = Math.floor(Math.random() * data.data.items.length);
    var item = data.data.items[random];
    if (!item || !item.headline) {
      doRequest(new UrlObj(randomUrl()), callback);
    }
    var text = '<strong>' + item.headline + '</strong>';
    text = text + item.original;
    callback(null, text, "thisiswhyyourefat.com");
  });
};

module.exports = function(callback) {
  doRequest(new UrlObj(randomUrl(), '?maxReturned=10'), callback);
};
