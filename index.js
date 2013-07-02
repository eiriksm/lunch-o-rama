'use strict';
var cheerio = require('cheerio'),
  config = require('./config'),
  Lunchword = require('./lunchwords'),
  Message = require('./message'),
  request = require('request');


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

// 96669 is leisure.

var room = '145806';



var found = {};

var doRequest = function(url) {
  request({url: url.url + url.params}, function(error, response, body) {
    var data = JSON.parse(body);
    // Determine if we want to use pagination.
    if (data.data.items.length > 0 &&
        data.data.pagination.nextPage && Math.floor(Math.random() * 2) === 1) {
      // Eh, let's do it again.
      doRequest(new UrlObj(url.url, '?' + data.data.pagination.nextPage));
      return;
    }
    if (data.data.items.length === 0) {
      doRequest(new UrlObj(randomUrl()));
    }
    var random = Math.floor(Math.random() * data.data.items.length);
    var item = data.data.items[random];
    var text = '<strong>' + item.headline + '</strong>';
    text = text + item.original;
    var mention = new Message('@EirikSMorland : ' +
                              new Lunchword().word + '. How about this:');
    mention.post();
    var pic = new Message(text, true);
    pic.post();

  });
};

doRequest(new UrlObj(randomUrl(), '?maxReturned=10'));
