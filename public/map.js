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

function loadMap(){
    var location = {lat: 42.361145, lng: -71.057083};
    infowindow = new google.maps.InfoWindow();
    
    newLocation().then(function(response){
        console.log(response.coords.latitude);
        location = {lat: response.coords.latitude, lng: response.coords.longitude};
        
        /* TESTING VARIABLES */
        //location = {lat: 41.573360, lng: -70.460670};

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: location
        });
        
        // let marker = new google.maps.Marker({
        //     position: location,
        //     map: map
        // });

        createCurrentLocationMarker(location);

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

function createCurrentLocationMarker(location){
    // var location = {lat: 42.361145, lng: -71.057083};
    let marker = new google.maps.Marker({
        position: location
    });
    marker.setMap(map);
    const infowindow = new google.maps.InfoWindow({
        content: "Current Location",
        title: "Current Location",
        maxWidth: 200
    });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
    console.log(place);
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });

    const request = {
        placeId: place.place_id
    };

    service.getDetails(request, (placeObject, status) => {
        let placeContent;
        if(status === google.maps.places.PlacesServiceStatus.OK &&
            placeObject){
                console.log(placeObject);
                placeContent = 
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">' + placeObject.name + '</h1>' +
    '<div id="bodyContent">' +
    
    "<p><a href='" + placeObject.url +"'>" + placeObject.formatted_address +"</a>" + "</p>"+
    "<p>" + "<b>Address: </b>" + placeObject.adr_address + "</p>" +
    "<p>Rating (out of 5): " + placeObject.rating + "</p>"+
    "<p>Total Ratings: " + placeObject.user_ratings_total + "</p>"+
    "</div>" +
    "</div>";
            }else{
            placeContent = 
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">' + place.name + '</h1>' +
    '<div id="bodyContent">' +
    "<p>" + place.name +"</p>" +
    "<p>Rating (out of 5): " + place.rating +"</p>" +
    "<p>Total Ratings: " + place.user_ratings_total +"</p>" +
    
    "</div>" +
    "</div>";
            }
        

    const infowindow = new google.maps.InfoWindow({
        content: placeContent,
        title: place.name,
        // maxWidth: 200
    });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
        console.log(place.name);
    });
    });

    
  }

  function createBeachElement(){

  }