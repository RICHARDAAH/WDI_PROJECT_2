const mongoose      = require('mongoose');

const databaseUrl   = process.env.MONGOLAB_URI || 'mongodb://localhost/galleries';
mongoose.connect(databaseUrl);

const Gallery      = require('../models/gallery');

Gallery.collection.drop();

const gallery1     = new Gallery({
  name: 'Whitechapel Gallery',
  string: 'Whitechapel+Gallery',
  img: 'images/whitechapel.jpg',
  lat: 51.5160375,
  lng: -0.0722831
});

gallery1.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery2     = new Gallery({
  name: 'Camden Arts centre',
  string: 'Camden+Arts+Centre',
  img: 'images/camden.jpg',
  lat: 51.551146,
  lng: -0.2185403
});

gallery2.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery3     = new Gallery({
  name: 'South London Gallery',
  string: 'South+London+Gallery',
  img: 'images/southlondongallery.jpg',
  lat: 51.4741624,
  lng: -0.0972284
});

gallery3.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery4     = new Gallery({
  name: 'Eames Fine Art Gallery',
  string: 'Eames+Fine+Art+Gallery',
  img: 'images/eamesfineart.jpg',
  lat: 51.5017655,
  lng: -0.0999106
});

gallery4.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery5     = new Gallery({
  name: 'Alan Cristia Gallery',
  string: 'Alan+Cristia+Gallery',
  img: 'images/alancristia.jpg',
  lat: 51.5153338,
  lng: -0.1451775
});

gallery5.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery6     = new Gallery({
  name: 'Castle Fine Art',
  string: 'Castle+Fine+Art',
  img: 'images/castlefineart.jpg',
  lat: 51.5154595,
  lng: -0.1450903
});

gallery6.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery7     = new Gallery({
  name: 'Tate Modern',
  string: 'Tate+Modern',
  img: 'images/tate.jpg',
  lat: 51.5066484,
  lng: -0.0992315
});

gallery7.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery8     = new Gallery({
  name: 'Guildhall Art Gallery',
  string: 'Guildhall+Art+Gallery',
  img: 'images/guildhall.jpg',
  lat: 51.5058687,
  lng: -0.1039679
});

gallery8.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery9     = new Gallery({
  name: 'Barbican Art Gallery',
  string: 'Barbican+Art+Gallery',
  img: 'images/barbican.jpg',
  lat: 51.5094322,
  lng: -0.1750592
});

gallery9.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery10     = new Gallery({
  name: 'Tate Britain',
  string: 'Tate+Britain',
  img: 'images/tatebrit.jpg',
  lat: 51.5058687,
  lng: -0.1039679
});

gallery10.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery11     = new Gallery({
  name: 'Saatchi Gallery',
  string: 'Saatchi+Gallery',
  img: 'images/saatchi.jpg',
  lat: 51.4906972,
  lng: -0.1937354
});

gallery11.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery12     = new Gallery({
  name: 'Royal Academy of Arts',
  string: 'Royal+Academy+of+Arts',
  img: 'images/royalacademy.jpg',
  lat: 51.5094426,
  lng: -0.1748875
});

gallery12.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery13     = new Gallery({
  name: 'Serpintine Gallery',
  string: 'Serpintine+Gallery',
  img: 'images/serpintine.jpg',
  lat: 51.5094218,
  lng: -0.1752309
});

gallery13.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery14     = new Gallery({
  name: 'Pump House Gallery',
  string: 'Pump+House+Gallery',
  img: 'images/pump.jpg',
  lat: 51.5094218,
  lng: -0.1752309
});

gallery14.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery15     = new Gallery({
  name: 'The Queens Gallery',
  string: 'The+Queens+Gallery',
  img: 'images/queens.jpg',
  lat: 51.5094218,
  lng: -0.1752309
});

gallery15.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

const gallery16    = new Gallery({
  name: 'Newport Street Gallery',
  string: 'Newport+Street+Gallery',
  img: 'images/newport.jpg',
  lat: 51.5094218,
  lng: -0.1752309
});

gallery16.save((err, gallery) => {
  if(err) return console.log(err);
  return console.log(`${gallery.name} was saved`);
});

// const gallery7     = new Gallery({
//   name: '',
//   string: '',
//   img: '',
//   lat: '',
//   lng: ''
// });
//
// gallery7.save((err, gallery) => {
//   if(err) return console.log(err);
//   return console.log(`${gallery.name} was saved`);
// });

// const gallery7     = new Gallery({
//   name: '',
//   string: '',
//   img: '',
//   lat: '',
//   lng: ''
// });
//
// gallery7.save((err, gallery) => {
//   if(err) return console.log(err);
//   return console.log(`${gallery.name} was saved`);
// });

// const gallery7     = new Gallery({
//   name: '',
//   string: '',
//   img: '',
//   lat: '',
//   lng: ''
// });
//
// gallery7.save((err, gallery) => {
//   if(err) return console.log(err);
//   return console.log(`${gallery.name} was saved`);
// });
