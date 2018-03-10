import '../scss/main.scss';
import { Coordinates, Weather } from './utils/api';
import Current from './components/current';
import Forecast from './components/forecast';
import Search from './components/search';
import Component from './st/component';
import autoComplete from './utils/autocomplete';
import Favorite from './components/favorite';

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
        this.coordinates = city => new Coordinates(city).getData();
        this.weather = response => new Weather(response).getAll();
        this.currentForecast = new Current();
        this.weekForecast = new Forecast();
        this.favorite = new Favorite();
        
    }

    onSearchSubmit(city) {
        this.coordinates(city)
            .then( results => {
                this.weather(results).then(([current, week]) => {
                    this.updateState({ current, week });
                    autoComplete(document.querySelector('.search__input'));
                });
            });
    }

    onClickFavorite() {
        console.log('zzz')
    }

    init() {
        this.update();
        autoComplete(document.querySelector('.search__input'));
    }


    render() {
        const { city, current, week } = this.state;
        if (this.state.current && this.state.week) {
            return [
                this.locationSearch.update({ city, onSubmit: this.onSearchSubmit }),
                this.currentForecast.update({ current }),
                this.favorite.update({ city, onClick: this.onClickFavorite }),
                this.weekForecast.update({ week })
            ];
        } else 
            return this.locationSearch.update({ city, onSubmit: this.onSearchSubmit });
        
    }
}

const app = new App({ host: document.querySelector('.content') });
app.init();