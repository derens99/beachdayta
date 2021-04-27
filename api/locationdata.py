# import requests as requests
import urllib.request, json 
import requests

class Location:

    STORMGLASS_KEY = '9a2f2d20-6415-11eb-8ed6-0242ac130002-9a2f2d98-6415-11eb-8ed6-0242ac130002'

    def __init__(self, lat, long):
        self.latitude = lat
        self.longitude = long

    def get_weathermap_data(self):
        link = "api.openweathermap.org/data/2.5/weather?lat=" + str(self.latitude) + "&lon=" + str(self.longitude) + "&appid=2f82481019505acbcefbd1a68d8188f4" + "&units=imperial"
        print(link)
        with urllib.request.urlopen("http://" + link) as url:
            data = json.loads(url.read().decode())

            # Assign location weather data
            self.temperature = data['main']['temp']
            self.feels_like = data['main']['feels_like']
            self.temp_min = data['main']['temp_min']
            self.temp_max = data['main']['temp_max']
            self.pressure = data['main']['pressure']
            self.humidity = data['main']['humidity']
            self.title = data['weather'][0]['main']
            self.description = data['weather'][0]['description']
            self.wind = data['wind']['speed']
    
    def get_stormglass_data(self):
        response = requests.get(
            'https://api.stormglass.io/v2/weather/point',
            params = {
                'lat': self.latitude,
                'lng': self.longitude,
                'params': ','.join(['waveHeight', 'waterTemperature'])
            },
            headers={
                'Authorization': self.STORMGLASS_KEY
            }
        )
        json_data = response.json()
        print(json_data)
        

    def get_json_data(self):
        data = {'temperature': self.temperature,
                'feels_like': self.feels_like,
                'temp_min': self.temp_min,
                'temp_max': self.temp_max,
                'pressure': self.pressure,
                'humidity': self.humidity,
                'title': self.title,
                'description': self.description,
                'wind': self.wind
                }
        return data


            

    def __repr__(self):
        return "latitude: " + str(self.latitude) + "\n" + "longitude: " + str(self.longitude)