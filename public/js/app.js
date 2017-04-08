"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}function start(){$("#login").on("submit",login),$("#signup").on("submit",register),$(".logout").on("click",logout),getToken()?loggedInState():loggedOutState()}function loggedInState(){$(".loggedOut").hide(),$(".loggedIn").show(),mapSetup()}function loggedOutState(){$(".loggedIn").hide(),$(".loggedOut").show(),$("#map-canvas").empty()}function login(e){e.preventDefault(),$.ajax({method:"POST",url:"http://localhost:3000/api/login",data:$(this).serialize()}).done(getLoggedIn)}function register(e){e.preventDefault(),$.ajax({method:"POST",url:"http://localhost:3000/api/register",data:$(this).serialize()}).done(getLoggedIn)}function logout(e){e.preventDefault(),removeToken(),loggedOutState()}function getLoggedIn(e){e.token&&(setToken(e.token),loggedInState())}function setToken(e){return window.localStorage.setItem("token",e)}function getToken(){return window.localStorage.getItem("token")}function removeToken(){return window.localStorage.clear()}function mapSetup(){var e=document.getElementById("map-canvas");window.map=new google.maps.Map(e,mapOptions);var t={location:mapOptions.center,radius:"2000",types:["art_gallery","museum","subway_station"]};window.service=new google.maps.places.PlacesService(window.map),window.service.nearbySearch(t,nearByCallback)}function nearByCallback(e,t){if(t===google.maps.places.PlacesServiceStatus.OK)for(var o=0;o<e.length;o++)createMarker(e[o]),console.log(e[o]),window.service.getDetails({placeId:e[o].place_id},function(e,t){t===google.maps.places.PlacesServiceStatus.OK&&console.log(e)})}function createMarker(e){var t=new google.maps.Marker({position:e.geometry.location,map:map,animation:google.maps.Animation.DROP,icon:"images/palette.png"});addInfoWindow(e,t)}function getDetailsCallback(e,t){t===google.maps.places.PlacesServiceStatus.OK&&console.log(e.formatted_address)}function addInfoWindow(e,t){google.maps.event.addListener(t,"click",function(){"undefined"!=typeof infoWindow&&infoWindow.close();var o;o=e.opening_hours.open_now?"Yes":"No",e.iconsList=e.types.map(function(t){switch("Tate Modern"===e.name&&console.log(t),t){case"restaurant":case"cafe":case"food":return'<i class="material-icons">restaurant</i>';case"museum":return'<i class="material-icons">account_balance</i>';case"art_gallery":return'<i class="material-icons">brush</i>'}});var a=new Set(e.iconsList);e.iconsList=[].concat(_toConsumableArray(a));var i="undefined"!=typeof e.photos?e.photos[0].getUrl({maxWidth:100,maxHeight:100}):"";infoWindow=new google.maps.InfoWindow({content:'<img class=infoImage" src="'+i+'" width="100px"> <p>'+e.iconsList.join("")+("</p>\n      <p>"+e.name+"</p> <p>Open now: "+o+"</p> <p>Rating: "+e.rating+"</p> <p>Address: "+e.vicinity+"</p>")}),infoWindow.open(map,t),map.setCenter(t.getPosition()),map.setZoom(12)})}$(start);var map,infoWindow,google=window.google,mapOptions={zoom:12,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"geometry",stylers:[{saturation:"-100"}]},{featureType:"landscape.natural.landcover",elementType:"geometry.fill",stylers:[{gamma:"1"},{lightness:"0"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{saturation:"-28"},{lightness:"33"}]},{featureType:"road",elementType:"labels.text",stylers:[{color:"#545454"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{saturation:"-87"},{lightness:"-40"},{color:"#ffffff"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.fill",stylers:[{saturation:"-22"},{lightness:"100"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road.highway.controlled_access",elementType:"labels.icon",stylers:[{visibility:"on"}]},{featureType:"road.arterial",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{saturation:"-56"},{lightness:"-14"},{hue:"#00dcff"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"off"}]}]};