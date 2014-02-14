/*global describe, it */

var assert = require('assert');
var should = require('should');
var fmodules = require('../food_modules');
var _ = require('underscore');

describe('food module export', function() {
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
