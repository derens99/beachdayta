import json
from flask import Flask, request
from locationdata import Location
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app)


@app.route('/')
def index():
    return "Welcome"


@app.route('/beachdata', methods=['GET'])



def beachdata():
    latitude = float(request.args.get('latitude'))
    print(latitude)
    longitude = float(request.args.get('longitude'))
    print(longitude)
    loc = Location(latitude, longitude)
    loc.get_weathermap_data()
    json_data = loc.get_json_data()
    loc.get_stormglass_data()
    return json.dumps(json_data)



app.run()
