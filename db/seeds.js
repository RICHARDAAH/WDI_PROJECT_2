const mongoose      = require('mongoose');

const databaseUrl   = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/';
mongoose.connect(databaseUrl);

const Gallery      = require('../models/gallery');

Gallery.collection.drop();

const gallery     = new Gallery({
  name: 'Whitechapel Gallery',
  string: 'Whitechapel+Gallery',
  img: 'images/whitechapel.jpg',
  lat: '51.5160375',
  lng: '-0.0722831'
});

gallery1.save((err, gallery) => {
 if(err) return console.log(err);
 return console.log(`${gallery.name} was saved`);
});

const gallery2     = new Gallery({
  name: 'Lawrence Alkin Galley',
  string: 'Lawrence+Alkin+Gallery',
  img:  'images/lawrencealkin.jpg',
  lat: '51.5154621',
  lng: '-0.1450903'
});

gallery2.save((err, gallery) => {
 if(err) return console.log(err);
 return console.log(`${gallery.name} was saved`);
});

const gallery3     = new Gallery({
  name: 'South London Gallery',
  string: 'South+London+Gallery',
  img: 'images/southlondongallery.jpg',
  lat: '51.4741624',
  lng: '-0.0972284'
});

gallery3.save((err, gallery) => {
 if(err) return console.log(err);
 return console.log(`${gallery.name} was saved`);
});

const gallery4     = new Gallery({
  name: 'Eames Fine Art Gallery',
  string: 'Eames+Fine+Art+Gallery',
  img:  'images/eamesfineart.jpg',
  lat: '51.5017655',
  lng: '-0.0999106'
});

gallery4.save((err, gallery) => {
 if(err) return console.log(err);
 return console.log(`${gallery.name} was saved`);
});

const gallery5     = new Gallery({
  name: 'Alan Cristia Gallery',
  string: 'Alan+Cristia+Gallery',
  img:  'images/alancristia.jpg',
  lat: '51.5153338',
  lng: '-0.1451775'
});

gallery5.save((err, gallery) => {
 if(err) return console.log(err);
 return console.log(`${gallery.name} was saved`);
});

const gallery6     = new Gallery({
  name: 'Castle Fine Art'
  string: 'Castle+Fine+Art',
  img:   'castlefineart.jpg',
  lat: '51.5154595',
  lng: '-0.1450903'
});

gallery6.save((err, gallery) => {
 if(err) return console.log(err);
 return console.log(`${gallery.name} was saved`);
});
