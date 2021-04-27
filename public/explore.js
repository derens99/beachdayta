let service;

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

function generateCards(){
    newLocation().then(function(response){
        let location = {lat: response.coords.latitude, lng: response.coords.longitude};
        const request = {
            // radius: 80467,
            radius: 16093,
            location: location,
            keyword: "Beach"
        };
        service = new google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK && results){
                for(let i = 0; i < results.length; i++){
                    createHTMLCard(results[i]);
                }
            }
        });
    });
}

function createHTMLCard(place){
    // console.log(place);

    let col = document.createElement('div');
    col.className = "col-sm-4";
    
    let card_div = document.createElement('div');
    card_div.className = "card";

    let card_img = document.createElement("img");
    card_img.className = "card-img-top";
    card_img.src = "images/beach.jpg";

    let card_body = document.createElement('div');
    card_body.className = "card-body";

    let title = document.createElement('h5');
    title.className = "card-title";
    
    let text = document.createElement("p");
    text.className = "card-text";

    let rating = document.createElement("p");
    let total_rating = document.createElement("p");
    let url = document.createElement("A");

    let button = document.createElement('BUTTON');
    button.setAttribute("type", "button");
    button.className = "btn btn-info";
    button.innerHTML = "Beach Weather";

    let weatherDataDiv = document.createElement("div");
    weatherDataDiv.id = place.name.replace(/\s+/g, '');
    weatherDataDiv.className = "collapse";

    getPlacesDetails(place.place_id).then(function(place_object){
        if(place_object){
            // console.log(place_object);
            if(place_object.photos !== undefined){
                title.innerHTML = place_object.name;

                url.setAttribute("href", place_object.url);
                url.innerHTML = place_object.adr_address;
    
                rating.innerHTML = "Rating: " + place_object.rating;
                total_rating.innerHTML = "Total Ratings: " + place_object.user_ratings_total;
    
                card_img.src = place_object.photos[0].getUrl();
    
                button.addEventListener("click", function(){
                    button.setAttribute("data-toggle", "collapse");
                    button.setAttribute("data-target", "#"+place.name.replace(/\s+/g, ''));

                    fetch("http://beachdayta.ue.r.appspot.com/beachdata?latitude=42.3601&longitude=-71.0589")
                        .then(response => response.json())
                        .then(data => { 
                            weatherDataDiv.innerHTML = "";
                            console.log(data);
                            let temp = document.createElement('p');
                            temp.innerHTML ="<p>Temperature: " + data.temperature + "°F</p>";
                            weatherDataDiv.appendChild(temp);

                            let feels = document.createElement('p');
                            feels.innerHTML ="<p>Feels Like: " + data.feels_like + "°F</p>";
                            weatherDataDiv.appendChild(feels);

                            let desc = document.createElement('p');
                            desc.innerHTML ="<p>" + data.title + " : " + data.description + "</p>";
                            weatherDataDiv.appendChild(desc);

                            let tmin = document.createElement('p');
                            tmin.innerHTML ="<p>Temperature Min: " + data.temp_min + "°F</p>";
                            weatherDataDiv.appendChild(tmin);

                            let tmax = document.createElement('p');
                            tmax.innerHTML ="<p>Temperature Min: " + data.temp_max + "°F</p>";
                            weatherDataDiv.appendChild(tmax);

                            let pressure = document.createElement('p');
                            pressure.innerHTML ="<p>Pressure: " + data.pressure + "</p>";
                            weatherDataDiv.appendChild(pressure);

                            let humidity = document.createElement('p');
                            humidity.innerHTML ="<p>Humidity: " + data.humidity + "</p>";
                            weatherDataDiv.appendChild(humidity);

                            let wind = document.createElement('p');
                            wind.innerHTML ="<p>Wind: " + data.wind + " mph</p>";
                            weatherDataDiv.appendChild(wind);

                        }).catch(function(err){
                            console.log("error")
                        });

                        
                });

                card_body.appendChild(title);
                card_body.appendChild(text);
                card_body.appendChild(url);
                card_body.appendChild(rating);
                card_body.appendChild(total_rating);
                card_body.appendChild(button);
                card_body.appendChild(weatherDataDiv);

                let cardspot = document.getElementById("cardspot");

                card_div.appendChild(card_img);
                card_div.appendChild(card_body);

                col.appendChild(card_div);

                cardspot.appendChild(col);

            }
           

            // getWeather(place.geometry.location.lat(), place.geometry.location.lng());
            
        }
    }).catch(function(){
        title.innerHTML = place.name;
    });


    
}

function getPlacesDetails(place_id){
    return new Promise((resolve, reject) => {
        const request = {
            placeId: place_id
        };

        service.getDetails(request, (placeObject, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK && placeObject){
                resolve(placeObject);
            }else{
                reject(new Error("No place details."))
            }
        });
    });
}

generateCards();