#!/usr/local/bin/node

var argv = require('yargs')
  .usage('earth-wallpaper - Set the latest image from the NASA EPIC camera onboard the NOAA DSCOVR spacecraft as your macOS wallpaper')
  .options('f', {
    alias: 'force',
    describe: 'Force wallpaper update',
    boolean: true
  })
  .options('type', {
    alias: 'imageType',
    describe: 'Satellite image type',
    choices: ['natural', 'enhanced'],
    default: 'natural'
  })
  .options('format', {
    alias: 'fileType',
    describe: 'File format',
    choices: ['jpg', 'png'],
    default: 'jpg'
  })
  .options('apikey', {
    alias: 'apiKey',
    describe: 'NASA API key',
    string: true
  })
  .help('h')
  .argv;

var earthWallpaper = require('./index.js');

earthWallpaper(argv);