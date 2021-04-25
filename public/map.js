/* KEYS - I guess maps and places are the same? Hooked to firebase project */
const PLACES_KEY = "AIzaSyAFM9agRaYquHxxOemaUEcd9s3GBVXo60M";
const MAPS_KEY = "AIzaSyAFM9agRaYquHxxOemaUEcd9s3GBVXo60M";

let map;
let service;
let infowindow;

function loadMap(){
    var location = {lat: 42.361145, lng: -71.057083};
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location
    });
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });

    const request = {
        radius: 80467,
        location: location,
        keyword: "Beach"
        // fields: ['name', 'geometry'],
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK && results){
            for(let i = 0; i < results.length; i++){
                createMarker(results[i]);
            }
        }
    });
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
    console.log(place);

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
     
    });

    const placeContent = place.name + "\r" + "Rating: " + place.rating;
    const infowindow = new google.maps.InfoWindow({
        content: placeContent,
        title: place.name,
        maxWidth: 200
    });
    // marker.setMap(map);
    marker.addListener("click", () => {
        infowindow.open(map, marker);
        console.log(place.name);
    });
    // google.maps.event.addListener(marker, "click", () => {
      
    // });
  }
