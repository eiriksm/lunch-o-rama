/*
 * Instagram module for Lunch-o-rama.
 */


Instagram = require('instagram-node-lib');

Instagram.set('client_id', 'cd6adce6dde646c9bff459ab987294b6');
Instagram.set('client_secret', '1390a042c8b04e97be7f3e8c040fb823');

var instaImage = {};

Instagram.tags.recent({
  name: 'foodporn',
  complete: function(data){
    var pic = Math.floor(Math.random() * data.length);

    instaImage.url = data[pic].images.standard_resolution.url;
    instaImage.text = data[pic].caption.text;
    instaImage.source = data[pic].link;
  },
  error: function(errorMessage, errorObject, caller) {
    callback(error);
  }
});

module.exports = function(callback) {
  try {
    callback(null, instaImage.text + ' <img src="' + instaImage.url + '" />', instaImage.source);
  }
  catch(err) {
    callback(error);
  }
}