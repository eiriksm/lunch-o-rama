'use strict';

var words = [
  'LUUUUUNNNJNNSSJ',
  'LOOOINSSSSJ',
  'LØHØHØHØHØHØHØHØNSJ'
];

var lunchword = function() {
  this.word = words[Math.floor(Math.random() * words.length)];
};

module.exports = lunchword;
