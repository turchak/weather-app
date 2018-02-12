import '../scss/main.scss';
import elements from './elements';
import Render from './render';
import OnInit from './init';
import { createClient } from '@google/maps';




class Coordinates {
    constructor() {
        this.googleMapsClient = createClient({
            key: 'AIzaSyD3LTkgH_ASYBXH-63RyoCNnklwXscJVek',
            language: 'en',
            Promise: Promise
        });
    }
    getData(city) {
        return new Promise( resolve => {
            const results = this.googleMapsClient.geocode({
                address: city
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
                forecast: 'https://api.openweathermap.org/data/2.5/forecast'
            },
            key:         '5499a420699d421297f7f99e774cfc94',
            units: {
                metric:     'M',
                fahrenheit: 'I'
            }
        };
    }

    getCurrent() {
        const url = this.settings.url.weather + '?lat=' + this.info.coordinates.lat + '&lon=' + this.info.coordinates.lng + '&key=' + this.settings.key + '&units=' + this.settings.units.metric;
        fetch(url)
            .then(response => {
                return response.json();
            }).then(results => {
                this.info.weather = results.data[0];
                new Render(this.info).showCurrent();     
            });
    }
}




elements.header.addEventListener('click', ({ target }) => {
    if (target === elements.search.button) {
        new Coordinates().getData(elements.search.input.value)
            .then(results => {
                new Weather(results).getCurrent();
            });
    }
});


new OnInit();