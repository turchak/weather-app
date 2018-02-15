import '../scss/main.scss';
import elements from './elements';
import Render from './render';
import OnInit from './init';
import { createClient } from '@google/maps';




class Coordinates {
    constructor(city) {
        this.city = city;
        this.googleMapsClient = createClient({
            key: 'AIzaSyD3LTkgH_ASYBXH-63RyoCNnklwXscJVek',
            language: 'en',
            Promise: Promise
        });
    }
    getData() {
        return new Promise( resolve => {
            const results = this.googleMapsClient.geocode({
                address: this.city
            }).asPromise()
                .then(response => {
                    return response.json.results[0];
                });
            return resolve(results);
        });
    }
}



class Weather {
    constructor(data) {
        this.info = {
            coordinates: {
                city: data.address_components[0].long_name,
                lat:  data.geometry.location.lat,
                lng:  data.geometry.location.lng
            }
        };
        this.settings = {
            url: {
                weather:  'https://api.weatherbit.io/v2.0/current',
                forecast: 'https://api.weatherbit.io/v2.0/forecast/daily'
            },
            key: '5499a420699d421297f7f99e774cfc94',
            units: {
                fahrenheit: 'I',
                metric:     'M'
            },
            days: '5'
        };
    }

    getCurrent() {
        const url = this.settings.url.weather + '?lat=' + this.info.coordinates.lat + '&lon=' + this.info.coordinates.lng + '&key=' + this.settings.key + '&units=' + this.settings.units.metric;
        fetch(url)
            .then(response => {
                return response.json();
            }).then(results => {
                this.info.weather = results.data[0];
                new Render().showCurrent(this.info);     
            });
    }

    getForecast() {
        const url = this.settings.url.forecast + '?lat=' + this.info.coordinates.lat + '&lon=' + this.info.coordinates.lng + '&key=' + this.settings.key + '&units=' + this.settings.units.metric + '&days=' + this.settings.days;
        fetch(url)
            .then(response => {
                return response.json();
            }).then(results => {
                this.info.forecast = results.data;
                new Render().showForecast(this.info);
            });
    }
}




elements.header.addEventListener('click', ({ target }) => {
    if (target === elements.search.button) {
        new Coordinates(elements.search.input.value).getData()
            .then(results => {
                new Weather(results).getCurrent();
                new Weather(results).getForecast();
            });
    }
});

export { Coordinates, Weather } ;

new OnInit('London, UK');