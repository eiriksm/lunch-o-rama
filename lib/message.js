'use strict';
// Config is optional. Especially in tests.
var config;
try {
  config = require('../config');
}
catch (err) {
  config = {};
}

var request = require('request');

var MessageObj = function(text, html) {
  this.url = 'https://api.hipchat.com/v1/rooms/message';
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
  if (!this.form.auth_token) {
    console.log('Can not send message. Was going to send:');
    console.log(this.form.message);
    console.log(new Error('No auth token for hipchat found.'));
    this.error = true;
    return;
  }
  request.post(this.url, this, function (e, r, body) {
    /* istanbul ignore if */
    if (e) {
      console.log(e);
      return;
    }
  });
};

module.exports = MessageObj;
