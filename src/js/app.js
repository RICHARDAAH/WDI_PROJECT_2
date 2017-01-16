$(start);

var map;
var infoWindow;
var google = window.google;

function start() {
  $('#login').on('submit', login);
  $('#signup').on('submit', register);
  $('.logout').on('click', logout);

  if (getToken()){
    loggedInState();
  } else {
    loggedOutState();
  }
}

function loggedInState() {
  $('.loggedOut').hide();
  $('.loggedIn').show();
  mapSetup();
}

function loggedOutState() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  $('#map-canvas').empty();
}

function login(e){
  e.preventDefault();

  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/api/login',
    data: $(this).serialize()
  }).done(getLoggedIn);
}

function register(e){
  e.preventDefault();

  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/api/register',
    data: $(this).serialize()
  }).done(getLoggedIn);
}

function logout(e) {
  e.preventDefault();
  removeToken();
  loggedOutState();
}

function getLoggedIn(data) {
  if (data.token) {
    setToken(data.token);
    loggedInState();
  }
}

function setToken(token){
  return window.localStorage.setItem('token', token);
}

function getToken(){
  return window.localStorage.getItem('token');
}

function removeToken(){
  return window.localStorage.clear();
}

function mapSetup() {
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(canvas, mapOptions);
  getGalleries();
}

function getGalleries() {
  $.get('http://localhost:3000/api/galleries').done(loopThroughGalleries);
}

function loopThroughGalleries(data) {
  $.each(data.galleries, (index, gallery) => {
    createMarkerForGallery(gallery);
  });
}

function createMarkerForGallery(gallery) {
  const latlng = new google.maps.LatLng(gallery.lat, gallery.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: map,
    animation: google.maps.Animation.DROP
  });

  addInfoWindowForGallery(gallery, marker);
}

function addInfoWindowForGallery(gallery, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof infoWindow !== 'undefined') infoWindow.close();

    infoWindow = new google.maps.InfoWindow({
      content: `<img src="../${gallery.img}"><p>${ gallery.name }</p>`
    });

    infoWindow.open(map, marker);
    map.setCenter(marker.getPosition());
    map.setZoom(15);
  });
}
