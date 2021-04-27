function getWeather(lat, lng){
    let url = "http://beachdayta.ue.r.appspot.com/beachdata?latitude=42.3601&longitude=-71.0589";
    fetch("http://beachdayta.ue.r.appspot.com/beachdata?latitude=42.3601&longitude=-71.0589")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            }).catch(function(err){
                console.log("error");
            });
}

function weather(lat, lng){
    return new Promise((resolve, reject) => {
        let url = "http://beachdayta.ue.r.appspot.com/beachdata?latitude=" + lat + "&longitude=" + lng;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resolve(data);
            }).catch(function(err){
                reject(new Error("Error"));
            });
    })
}