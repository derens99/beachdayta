/* KEYS - I guess maps and places are the same? Hooked to firebase project */
const PLACES_KEY = "AIzaSyAFM9agRaYquHxxOemaUEcd9s3GBVXo60M";
const MAPS_KEY = "AIzaSyAFM9agRaYquHxxOemaUEcd9s3GBVXo60M";

function loadMap(){
    var location = {lat: 42.361145, lng: -71.057083};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

async function getPlaces(){
    /* EXAMPLE URL CALL
       https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=42.361145,-71.057083&radius=80467.2&keyword=beach&key=AIzaSyAFM9agRaYquHxxOemaUEcd9s3GBVXo60M
    */
    let lat = 42.361145;
    let lng = -71.057083;
    let radius = 80467.2;
    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=" + radius + "&keyword=beach&key=" + MAPS_KEY;
    alert(url);
    console.log(url);

    let response = await fetch(url);
    let data = await response.json();
    return data
}
getPlaces().then(data => console.log(data));