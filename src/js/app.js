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
    styles:
    [
      {
        'featureType': 'administrative.country',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'administrative.province',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'administrative.neighborhood',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [
          {
            'saturation': '-100'
          }
        ]
      },
      {
        'featureType': 'landscape.natural.landcover',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'gamma': '1'
          },
          {
            'lightness': '0'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'saturation': '-28'
          },
          {
            'lightness': '33'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text',
        'stylers': [
          {
            'color': '#545454'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'saturation': '-87'
          },
          {
            'lightness': '-40'
          },
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'saturation': '-22'
          },
          {
            'lightness': '100'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'saturation': '-56'
          },
          {
            'lightness': '-14'
          },
          {
            'hue': '#00dcff'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      }
    ]
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
      content: `<img class=infoImage" src="../${gallery.img}" width="200px">
      <p>${ gallery.name }</p>`
      // maxWidth: 120
      // maxHeight: 50
    });

    infoWindow.open(map, marker);
    map.setCenter(marker.getPosition());
    map.setZoom(12);
  });
}
