const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  name: String,
  string: String,
  img: String,
  location: String,
  lat: String,
  lng: String
});

module.exports = mongoose.model('Gallery', gallerySchema);
