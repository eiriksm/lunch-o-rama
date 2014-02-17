exports.complete = function(data, callback) {
  var instaImage = {};
  var pic = Math.floor(Math.random() * data.length);

  instaImage.url = data[pic].images.standard_resolution.url;
  instaImage.text = data[pic].caption.text;
  instaImage.source = data[pic].link;
  callback(null, instaImage.text + ' <img src="' + instaImage.url + '" />', instaImage.source);
};

exports.error = function(errorMsg, callback) {
  callback(errorMsg);
}