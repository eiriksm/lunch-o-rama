'use strict';

var fs = require('fs');

var words = fs.readFileSync('lunchwords.txt', 'utf-8').split("\n");
words.pop();

var lunchword = function() {
  this.word = words[Math.floor(Math.random() * words.length)];
};

module.exports = lunchword;
