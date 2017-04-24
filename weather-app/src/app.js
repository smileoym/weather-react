import React from 'react';
import CityInput from './components/cityInput';
import CityWeatherList from './components/cityWeatherList';

var APPID = 'da06cf8106afb34ae1142a4beb9ed1aa';
var OPENWEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';
var LS_PREFIX = 'cities-';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cities:  _getFromStorage()
        };
        this.findCity = this.findCity.bind(this);
        this.addCity = this.addCity.bind(this);
        this.removeCity = this.removeCity.bind(this);
        this.reloadCities = this.reloadCities.bind(this);
        this.findMe(this);
    }

    findMe(self) {
        _geoFindMe(self);
    }

    findCity(cityName) {
        var self = this;
        if (cityName === '') return;
        _get(OPENWEATHER_URL + '?q=' + cityName + '&units=metric' + '&APPID=' + APPID)
            .then(function(data) {
                self.addCity(data);
            });
    }

    addCity(city) {
        _addToStorage(city);
        this.reloadCities();
    }

    removeCity(cityId) {
        _removeFromStorage(cityId);
        this.reloadCities();
    }

    reloadCities() {
        this.setState({ cities: _getFromStorage()});
    }

    render() {
        return (
            <div>
                <CityInput handleInput={this.findCity}/>
                <CityWeatherList cities={this.state.cities} onRemove={this.removeCity}/>
            </div>
        );
    }

}

function _get(url) {
    return fetch(url).then(function (res) {
        return res.json();
    });
}

function _geoFindMe(callback) {
    if (!navigator.geolocation){
        return;
    }

    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        _findCityByGeoCoord(latitude, longitude, callback);
    }

    navigator.geolocation.getCurrentPosition(success);
}

function _findCityByGeoCoord(lat, lon, callback) {
    _get(OPENWEATHER_URL + '?lat=' + lat + '&lon=' + lon + '&units=metric' + '&APPID=' + APPID)
        .then(function(data) {
            callback.addCity(data);
        });
}

function _addToStorage(city) {
    var lskey = LS_PREFIX + city.id;
    if (!localStorage.getItem(lskey)) {
        localStorage.setItem(lskey, JSON.stringify(city));
    }
}

function _removeFromStorage(cityId) {
    localStorage.removeItem(LS_PREFIX + cityId);
}

function _getFromStorage() {
    var cities = [];
    if (localStorage.length) {
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).indexOf(LS_PREFIX) !== -1) {
                cities.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }
        }
    }
    return cities;
}

export default App;
