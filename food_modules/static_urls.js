/*
 * Example food module.
 *
 * All food modules should export a function that accepts a callback. This
 * callback should be invoked in a node-standard way, that is with the params
 * error, result, source.
 *
 * If your module succeeded you should call the callback like this:
 *
 * callback(null, 'this is an ugly pic<img src="yourpic" />', 'mysource.com');
 *
 * If your module had an error, you should invoke the callback with something
 * as the first parameter. For example:
 *
 * callback(new Error('Big problems finding a big burger'));
 *
 */

'use strict';

var images = [
  {
    url: 'http://i.imgur.com/ce3gDhC.jpg?1',
    source: 'imgur.com',
    text: 'Nuff said'
  },
  {
    url: 'http://bp.uuuploads.com/vintage-ads-that-would-be-banned-today/vintage-ads-that-would-be-banned-today-15.jpg',
    source: 'http://news-hound.org/23-vintage-ads-that-would-be-banned-today/',
    text: 'Cochon Prodigue'
  }
];

module.exports = function(callback) {
  try {
    // Find random image in the array above.
    var image = images[Math.floor(Math.random() * images.length)];
    // Call the callback with the info from that image.
    callback(null, image.text + ' <img src="' + image.url + '" />', image.source);
  }
  catch(err) {
    // If we errored out in the try/catch... Pass that to the callback.
    /* istanbul ignore next */
    callback(err);
  }
};
