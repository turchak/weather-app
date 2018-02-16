import elements from './elements';
import { Coordinates, Weather } from './app';

class OnInit {
    constructor(city) {
        this.city = city;
        this.runAutoComplete();
        elements.search.input.value = this.city;
        // this.runStartCity(this.city);
    }

    runAutoComplete() {
        new google.maps.places.Autocomplete((elements.search.input), {
            types: ['(cities)']
        });
    }

    runStartCity(city) {
        new Coordinates(city).getData()
            .then(results => {
                new Weather(results).getCurrent();
                new Weather(results).getForecast();
            });
    }
}

export default OnInit;