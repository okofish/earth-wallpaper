var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var osascript = require('osascript-promise');
var request = require('request-promise');
var rimraf = require('rimraf').sync;

var getScript = require('./getScript.js');

module.exports = function(options) {
  var options = options || {};
  
  var imageType = options.imageType || 'natural';
  var apiKey = options.apiKey || 'DEMO_KEY';
  var fileType = options.fileType || 'jpg';
  var force = options.force || false;

  var imagesDir = path.join(__dirname, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  request.get({
    url: `https://epic.gsfc.nasa.gov/api/${imageType}`,
    json: true
  }).then(function(images) {
    var imageObj = images[images.length - 1];
    var imageId = imageObj.image;
    var dateYMD = imageObj.date.split(' ')[0].split('-');

    return request.get({
      url: `https://api.nasa.gov/EPIC/archive/${imageType}/${dateYMD[0]}/${dateYMD[1]}/${dateYMD[2]}/${fileType}/${imageId}.${fileType}?api_key=${apiKey}`,
      encoding: null
    })
  }).then(function(imageData) {
    var hash = crypto.createHash('sha1');
    hash.update(imageData);
    var currentImageDigest = hash.digest('hex');

    var existingImageHashes = fs.readdirSync(imagesDir).map(function(file) {
      return path.basename(file, `.${fileType}`)
    });

    if (existingImageHashes.indexOf(currentImageDigest) !== -1 && force !== true) {
      console.log('No new images.');
      process.exit(0);
    } else {
      rimraf(imagesDir);
      fs.mkdirSync(imagesDir);

      var newFilePath = path.join(imagesDir, `${currentImageDigest}.${fileType}`);
      fs.writeFileSync(newFilePath, imageData, {
        encoding: 'binary'
      });

      var script = getScript(newFilePath);
      
      return osascript(script)
    }
  }).then(function(result) {
    // done!
    process.exit(0);
  }).catch(function(err) {
    console.error(err);
  });
}
