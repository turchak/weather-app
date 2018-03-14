import '../scss/main.scss';
import { Coordinates, Weather } from './utils/api';
import Current from './components/current';
import Forecast from './components/forecast';
import Search from './components/search';
import Component from './st/component';
import autoComplete from './utils/autocomplete';
import Favorite from './components/favorite';
import Units from './components/units';
class App extends Component {
    constructor({ host }) {
        super();
        this.host = host;
        this.state = {
            city: new URLSearchParams(window.location.search).get('city') || '',
            current: null,
            week: null,
            units: localStorage.units || 'M'
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.changeUnits = this.changeUnits.bind(this);
        this.locationSearch = new Search({
            city: this.state.city,
            onSubmit: this.onSearchSubmit,
        });
        this.coordinates = city => new Coordinates(city).getData();
        this.weather = (response, units) => new Weather(response, units).getAll();
        this.currentForecast = new Current();
        this.weekForecast = new Forecast();
        this.favorite = new Favorite();
        this.units = new Units();
    }

    onSearchSubmit(city) {
        const units = this.state.units;
        this.coordinates(city)
            .then( results => {
                this.weather(results, units).then(([current, week]) => {
                    this.updateState({ city, current, week });
                    autoComplete(document.querySelector('.search__input'));
                });
            });
    }

    init() {
        this.update();
        autoComplete(document.querySelector('.search__input'));
    }

    changeUnits(units) {
        this.state.units = units;
        this.onSearchSubmit(this.state.city);
    }

    render() {
        const { city, current, week } = this.state;
        if (this.state.current && this.state.week) {
            return [
                this.locationSearch.update({ city, onSubmit: this.onSearchSubmit }),
                this.units.update({ onSwitch: this.changeUnits }),
                this.currentForecast.update({ current }),
                this.weekForecast.update({ week }),
                this.favorite.update({ city, onClick: this.onSearchSubmit }),
            ];
        } else 
            return this.locationSearch.update({ city, onSubmit: this.onSearchSubmit });
    }
}

const app = new App({ host: document.querySelector('.content') });
app.init();