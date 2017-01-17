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

function setRequestHeader(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
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
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{'featureType': 'all','elementType': 'geometry','stylers': [{'color': '#1d2c4d'}]},{'featureType': 'all','elementType': 'labels.text.fill','stylers': [{'color': '#8ec3b9'}]},{'featureType': 'all','elementType': 'labels.text.stroke','stylers': [{'color': '#1a3646'}]},{'featureType': 'administrative','elementType': 'geometry.fill','stylers': [{'color': '#0e1626'}]},{'featureType': 'administrative.country','elementType': 'geometry.stroke','stylers': [{'color': '#4b6878'}]},{'featureType': 'administrative.province','elementType': 'geometry.stroke','stylers': [{'color': '#4b6878'}]},{'featureType': 'administrative.land_parcel','elementType': 'labels.text.fill','stylers': [{'color': '#64779e'}]},{'featureType': 'landscape','elementType': 'geometry.fill','stylers': [{'color': '#353535'}]},{'featureType': 'landscape.man_made','elementType': 'geometry.stroke','stylers': [{'color': '#334e87'}]},{'featureType': 'landscape.natural','elementType': 'geometry','stylers': [{'color': '#3e3e3e'}]},{'featureType': 'poi','elementType': 'geometry','stylers': [{'color': '#3e3e3e'}]},{'featureType': 'poi','elementType': 'labels.text.fill','stylers': [{'color': '#6f9ba5'}]},{'featureType': 'poi','elementType': 'labels.text.stroke','stylers': [{'color': '#1d2c4d'}]},{'featureType': 'poi.park','elementType': 'geometry.fill','stylers': [{'color': '#3e3e3e'}]},{'featureType': 'poi.park','elementType': 'labels.text.fill','stylers': [{'color': '#3c7680'}]},{'featureType': 'road','elementType': 'geometry','stylers': [{'color': '#29292a'}]},{'featureType': 'road','elementType': 'labels.text.fill','stylers': [{'color': '#98a5be'}]},{'featureType': 'road','elementType': 'labels.text.stroke','stylers': [{'color': '#1d2c4d'}]},{'featureType': 'road.highway','elementType': 'geometry','stylers': [{'color': '#1175ba'}]},{'featureType': 'road.highway','elementType': 'geometry.stroke','stylers': [{'color': '#0d5a8e'}]},{'featureType': 'road.highway','elementType': 'labels.text.fill','stylers': [{'color': '#b0d5ce'}]},{'featureType': 'road.highway','elementType': 'labels.text.stroke','stylers': [{'color': '#2b455e'}]},{'featureType': 'transit','elementType': 'labels.text.fill','stylers': [{'color': '#98a5be'}]},{'featureType': 'transit','elementType': 'labels.text.stroke','stylers': [{'color': '#1d2c4d'}]},{'featureType': 'transit.line','elementType': 'geometry.fill','stylers': [{'color': '#162832'}]},{'featureType': 'transit.station','elementType': 'geometry','stylers': [{'color': '#283c51'}]},{'featureType': 'water','elementType': 'geometry','stylers': [{'color': '#0e1626'}]},{'featureType': 'water','elementType': 'labels.text.fill','stylers': [{'color': '#4e6d70'}]}]
  };

  map = new google.maps.Map(canvas, mapOptions);
  getGalleries();
}

function getGalleries() {
  $.get({
    url: 'http://localhost:3000/api/galleries',
    beforeSend: setRequestHeader
  }).done(loopThroughGalleries);
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
    animation: google.maps.Animation.DROP,
    icon: 'images/palette.png'
  });

  addInfoWindowForGallery(gallery, marker);
}

function addInfoWindowForGallery(gallery, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof infoWindow !== 'undefined') infoWindow.close();

    infoWindow = new google.maps.InfoWindow({
      content: `<img class=infoImage" src="../${gallery.img}"><p>${ gallery.name }</p>`
    });

    infoWindow.open(map, marker);
    map.setCenter(marker.getPosition());
    map.setZoom(12);
  });
}
