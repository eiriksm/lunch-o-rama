'use strict';

var words = [
  'LUUUUUNNNJNNSSJ',
  'LOOOINSSSSJ',
  'L¯H¯H¯H¯H¯H¯H¯H¯NSJ'
];

var lunchword = function() {
  this.word = words[Math.floor(Math.random() * words.length)];
};

module.exports = lunchword;
