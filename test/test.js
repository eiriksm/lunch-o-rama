/*global describe, it */

var assert = require('assert');
var should = require('should');
var fmodules = require('../food_modules');
var Lunchword = require('../lib/lunchwords');
var Message = require('../lib/message');
var _ = require('underscore');

describe('Food modules export', function() {
  'use strict';
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
});
