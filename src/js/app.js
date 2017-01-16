// const googleMap = googleMap || {};
// const google = google;
//
// googleMap.addInfoWindowForGallery = function(gallery, marker) {
//   google.maps.event.addListener(marker, 'click', () => {
//     if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
//
//     this.infoWindow = new google.maps.InfoWindow({
//       content: `<img src="../${gallery.img}"><p>${ gallery.name }</p>`
//     });
//
//     this.infoWindow.open(this.map, marker);
//     this.map.setCenter(marker.getPosition());
//     this.map.setZoom(15);
//   });
// };
//
// googleMap.createMarkerForGallery = function(gallery) {
//   const latlng = new google.maps.LatLng(gallery.lat, gallery.lng);
//   const marker = new google.maps.Marker({
//     position: latlng,
//     map: this.map,
//     animation: google.maps.Animation.DROP
//   });
//
//   this.addInfoWindowForGallery(gallery, marker);
// };
//
// googleMap.loopThroughGalleries = function(data) {
//   $.each(data.galleries, (index, gallery) => {
//     setTimeout(() => {
//       console.log(gallery);
//       googleMap.createMarkerForGallery(gallery);
//     }, index * 50);
//   });
// };
//
// googleMap.getGalleries = function() {
//   $.get('http://localhost:3000/api/galleries').done(this.loopThroughGalleries);
// };
//
// googleMap.mapSetup = function() {
//   const canvas = document.getElementById('map-canvas');
//
//   const mapOptions = {
//     zoom: 12,
//     center: new google.maps.LatLng(51.506178,-0.088369),
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//
//   this.map = new google.maps.Map(canvas, mapOptions);
//   this.getGalleries();
// };

function start() {

  // googleMap.mapSetup.bind(googleMap)();

  $('#login').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/login',
      data: $(this).serialize()
    }).done(data => {
      console.log(data);
    });
  });

  $('#signup').on('submit', function(e){
    e.preventDefault();
    console.log('#signup');
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/register',
      data: $(this).serialize()
    }).done(data => {
      console.log(data);
    });
  });
}

$(start);
