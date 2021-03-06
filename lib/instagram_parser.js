exports.complete = function(data, callback) {
  var instaImage = {};
  var pic = Math.floor(Math.random() * data.length);

  instaImage.url = data[pic].images.standard_resolution.url;
  instaImage.text = (!data[pic].caption ? '#foodporn:' : data[pic].caption.text);
  callback(null, instaImage.text + ' <img src="' + instaImage.url + '" />', 'instagram');
};

exports.error = function(errorMsg, callback) {
  callback(errorMsg);
};
