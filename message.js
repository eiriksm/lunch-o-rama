'use strict';

var config = require('./config');
var request = require('request');

var MessageObj = function(text, html) {
  this.form = {
    room_id: config.room,
    from: config.user,
    message: text,
    message_format: 'text',
    auth_token: config.authToken,
    notify: 1,
    color: 'purple'
  };
  if (html) {
    this.form.message_format = 'html';
  }
};

MessageObj.prototype.post = function() {
  request.post('http://api.hipchat.com/v1/rooms/message', this, function (e, r, body) {
    if (e) {
      console.log(e);
      return;
    }
  });
};

module.exports = MessageObj;
