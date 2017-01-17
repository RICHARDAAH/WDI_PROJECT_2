const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  name: String,
  string: String,
  img: String,
  lat: { type: Number },
  lng: { type: Number }
});

module.exports = mongoose.model('Gallery', gallerySchema);
