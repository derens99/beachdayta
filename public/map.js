/* KEYS - I guess maps and places are the same? Hooked to firebase project */
const PLACES_KEY = "AIzaSyAFM9agRaYquHxxOemaUEcd9s3GBVXo60M";
const MAPS_KEY = "AIzaSyAFM9agRaYquHxxOemaUEcd9s3GBVXo60M";

let map;
let service;
let infowindow;

function newLocation(){
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("YAY");
                resolve(position);
            });
        }else{
            // let pos = {lat: position.coords.latitude, lng: position.coords.longitude};
            
            reject(new Error("ERRRORORORORORO"));
        }
    });
}
// var location = currentLocation();

function loadMap(){
    var location = {lat: 42.361145, lng: -71.057083};
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: location
    });
    newLocation().then(function(response){
        console.log(response.coords.latitude);
        location = {lat: response.coords.latitude, lng: response.coords.longitude};
        let marker = new google.maps.Marker({
            position: location,
            map: map
        });

        const request = {
            radius: 80467,
            location: location,
            keyword: "Beach"
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK && results){
                for(let i = 0; i < results.length; i++){
                    createMarker(results[i]);
                }
            }
        });
    }, function(error){
        console.log(error);
    })
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
    // console.log(place);

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
    marker.addListener("click", () => {
        infowindow.open(map, marker);
        console.log(place.name);
    });
  }

  function createBeachElement(){
      
  }