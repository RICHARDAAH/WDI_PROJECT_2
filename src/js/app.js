$(start);

var numClicks = 1;
var map;
var infoWindow;
var google = window.google;
var markers = [];

const mapOptions = {
  zoom: 13,
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
  document.getElementById('load-more').disabled = false;
  numClicks = 1;
  markers = [];
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
// added after project deadline
function mapSetup() {
  const canvas = document.getElementById('map-canvas');
  window.map = new google.maps.Map(canvas, mapOptions);
  var request = {location: mapOptions.center,
    radius: 1000,
    types: ['art_gallery', 'museum', 'subway_station']
  };
  window.service = new google.maps.places.PlacesService(window.map);
  window.service.nearbySearch(request, nearByCallback);
}
// added after project deadline
function nearByCallback(results, status, pagination){
  if (status === google.maps.places.PlacesServiceStatus.OK){
    //console.log(results.length);
    for(var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      //console.log(results[i]);
    }
  }
  if (pagination && pagination.hasNextPage){
    var moreButton = document.getElementById('load-more');
    moreButton.addEventListener('click',function(){
      pagination.nextPage();
      if (markers.length >= 60 ){
        moreButton.disabled = true;
      }
    });
  }
}
// updated after project deadline
function createMarker(place) {
  var icon;
  if (place.types.indexOf('museum') > -1) {
    icon = 'images/museum.png';
  }
  if (place.types.indexOf('art_gallery') > -1) {
    icon = 'images/galleries.png';
  }
  if (place.types.indexOf('subway_station') > -1) {
    icon = 'images/station.png';
  }
  var marker = new google.maps.Marker({
    placeId: place.place_id,
    position: place.geometry.location,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: icon,
    types: place.types
  });
  if (!markerExists(marker.placeId)){
    markers.push(marker);
  } else {
    console.log('place already exists');
  }
  addInfoWindow(place, marker);
  console.log(markers.length);
}
function markerExists(placeId){
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].placeId === placeId){
      return true;
    }
  }
  return false;
}
function removeMarkers(removeTypes){
  markers.map(function(marker){
    marker.setMap(map);
    marker.types.map(function(type){
      if (removeTypes.indexOf(type) > -1){
        marker.setMap(null);
      }
    });
  });
}
// updated after project deadline
function getDetailsCallback(place, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK){
    //console.log(place.formatted_address);
  }
}

function addInfoWindow(place, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof infoWindow !== 'undefined') infoWindow.close();
    if (place.opening_hours){
      var openNow;
      if (place.opening_hours.open_now) {
        openNow = 'Yes';
      } else {
        openNow = 'No';
      }
    }
    place.iconsList = place.types.map(type => {
      switch (type) {
        case 'restaurant':
        case 'cafe':
        case 'food':
          return ('<i class="material-icons">restaurant</i>');
        case 'museum':
          return ('<i class="material-icons">account_balance</i>');
        case 'art_gallery':
          return ('<i class="material-icons">brush</i>');
      }
    });
    //style images for info window here
    var iconsSet = new Set(place.iconsList);
    place.iconsList = [...iconsSet];
    var imgUrl = typeof place.photos !== 'undefined'? place.photos[0].getUrl({'maxWidth': 100,'maxHeight': 100}):'';
    var imgTag = '';
    if (imgUrl){
      imgTag +=  `<img class=infoImage src="${imgUrl}" width="100px">`;
    }
    var openTag = '';
    if (openNow) {
      openTag += `<p>Open now: ${ openNow }</p>`;
    }
    var ratingTag = '';
    if (place.rating){
      ratingTag += `<p>Rating: ${ place.rating }</p>`;
    }
    infoWindow = new google.maps.InfoWindow({
      content: imgTag +` <p>`+place.iconsList.join('')+`</p>
      <p>${ place.name }</p> `+ openTag + ratingTag + ` <p>Address: ${ place.vicinity }</p>`
    });

    infoWindow.open(map, marker);
    map.setCenter(marker.getPosition());
  });
}
// added after project deadline
function getUncheckedBoxes(){
  var checkBoxes = document.getElementsByName('category');
  var uncheckedBoxes = [];
  for (var i = 0; i < checkBoxes.length; i++) {
    if (!checkBoxes[i].checked)
      uncheckedBoxes.push(checkBoxes[i].value);
  }
  removeMarkers(uncheckedBoxes);
  //console.log(uncheckedBoxes);
}


// Style the info windows

// fix nav bar i.e logout button!/ visibility

// BUGS THAT NEED FIXING ASAP!

// the load more button stops working after the first three clicks using it even after you log out, then back in.
