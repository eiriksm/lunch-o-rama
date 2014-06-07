/*global describe, it */

var assert = require('assert');
var should = require('should');
var fmodules = require('../food_modules');
var Lunchword = require('../lib/lunchwords');
var Message = require('../lib/message');
var _ = require('underscore');

describe('Food modules export', function() {
  it('Should export a function for each food module', function(done) {
    for (var mod in fmodules) {
      fmodules[mod].should.be.an.instanceOf(Function);
    }
    done();
  });

  it('Should call the callback with all modules', function(done) {
    this.timeout(10000);
    var i = 0;
    for (var mod in fmodules) {
      fmodules[mod](function(err, res) {
        i++;
      });
    }
    var waitForFinish = function() {
      if (i >= _.size(fmodules)) {
        done();
        return;
      }
      setTimeout(waitForFinish, 1000);
    };
    waitForFinish();
  });
});

describe('Lunchwords', function() {
  it('Should be exposed as a function', function(done){
    Lunchword.should.be.an.instanceOf(Function);
    done();
  });

  it('Should contain a word when we "new" it', function() {
    var word = new Lunchword();
    word.word.should.be.an.instanceOf(String);
  });
});

describe('Message', function() {
  it('Should be exposed as a function', function() {
    Message.should.be.an.instanceOf(Function);
  });

  it('Should be possible to "new" and create a form', function() {
    var post = new Message('test text');
    post.form.message.should.equal('test text');
  });

  it('Should be created as html when specified', function() {
    var post = new Message('test text', true);
    post.form.message_format.should.equal('html');
  });

  it('Should do something when we try to post it', function() {
    var post = new Message('test text', true);
    post.post();
    post.error.should.equal(true);
  });

  it('Should come further if we hack in some variables', function(done) {
    // Create server just to receive this response.
    var http = require('http');
    http.createServer(function (req, res) {
      var body = '';
      req.on('data', function(d) {
        body += d;
      });
      req.on('end', function() {
        body.should.equal('room_id=&from=&message=test%20text&message_format=html&auth_token=123&notify=1&color=purple');
        // Just write an error, so we can test that part too.
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
        done();
      });
    }).listen(1337, '127.0.0.1');
    var post = new Message('test text', true);
    post.url = 'http://localhost:1337';
    post.form.auth_token = '123';
    post.post();
  });
});
describe('Instagram specific', function() {
  var i = require('../food_modules/instagram');
  it('Should try to do something if we pass in the config', function(done) {
    i(function(err, res) {
      err.should.not.equal(null);
      done();
    }, {
      instaID: 'abc',
      instaSecret: 'bca'
    });
  });

  var p = require('../lib/instagram_parser');
  it('Should return the expected value on parsing instagram data', function(done) {
    p.complete(
      [{
        images: {
          standard_resolution: {
            url: 'test'
          }
        },
        caption: {
          text: 'test_text'
        },
        link: 'testlink'
      }], function(err, data, source) {
      data.should.equal('test_text <img src="test" />');
      source.should.equal('instagram');
      done();
    });
  });

  it('Should return the expected value on parsing instagram data', function(done) {
    p.complete(
      [{
        images: {
          standard_resolution: {
            url: 'test'
          }
        },
        link: 'testlink'
      }], function(err, data, source) {
      data.should.equal('#foodporn: <img src="test" />');
      source.should.equal('instagram');
      done();
    });
  });

});
