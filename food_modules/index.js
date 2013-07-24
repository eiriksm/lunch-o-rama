'use strict';

var fs = require('fs');

fs.readdirSync('./food_modules').forEach(function(file) {
  // If we find index.js, don't export.
  if (file === 'index.js') {
    return;
  }
  var exportname = file.replace('.js', '');
  exports[exportname] = require('./' + file);
});
