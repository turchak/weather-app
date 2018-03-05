import '../scss/main.scss';
import { Coordinates, Weather } from './utils/api';
import Current from './components/current';
import Forecast from './components/forecast';
import Search from './components/search';


class App {
    constructor(host) {
        this.state = {
            city: new URLSearchParams(window.location.search).get('city') || ''
        };
        this.host = host;
        this.locationSearch = new Search();
        this.coordinates = city => new Coordinates(city);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    updateState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
        this.render();
    }

    onSearchSubmit(city) {
        this.updateState({ city });
        this.coordinates(this.state.city).getData()
            .then(results => {
                new Weather(results).getAll().then(([current, week]) => {         
                    this.host.appendChild(new Current(current).render());
                    this.host.appendChild(new Forecast(week).render());
                });
            });
    }

    render() {
        const { city } = this.state;
        this.host.innerHTML = '';
        this.host.appendChild(
            this.locationSearch.update({ city, onSubmit: this.onSearchSubmit})
        );
        this.locationSearch.runAutoComplete();
        return this.host;
    }
}

const app = new App(document.querySelector('.content'));
app.render();
