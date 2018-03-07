import '../scss/main.scss';
import { Coordinates, Weather } from './utils/api';
import Current from './components/current';
import Forecast from './components/forecast';
import Search from './components/search';
import Component from './st/component';

class App extends Component {
    constructor({ host }) {
        super();
        this.host = host;
        this.state = {
            city: new URLSearchParams(window.location.search).get('city') || '',
            current: null,
            week: null,
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.locationSearch = new Search({
            city: this.state.city,
            onSubmit: this.onSearchSubmit,
        });
        this.coordinates = city => new Coordinates(city);
        this.weather = new Current();
    }

    onSearchSubmit(city) {
        this.updateState({ city });
        this.coordinates(this.state.city).getData()
            .then(results => {
                new Weather(results).getAll().then(([current, week]) => {
                    this.state.current = current;
                    this.state.week = week;
                    this.host.appendChild(new Current().update({ current }));
                    this.host.appendChild(new Forecast().update({ week }));
                });
            });
    }


    render() {
        const { city } = this.state;
        return [
            this.locationSearch.update({ city, onSubmit: this.onSearchSubmit })
        ];
    }
}

const app = new App({ host: document.querySelector('.content') });
app.update();