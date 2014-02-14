/*global describe, it */

var assert = require('assert');
var should = require('should');
var fmodules = require('../food_modules');

describe('food module export', function() {
  'use strict';
  it('Should export a function for each food module', function(done) {
    for (var mod in fmodules) {
      fmodules[mod].should.be.an.instanceOf(Function);
    }
    done();
  });
});
