import Component from '../st/component';

class Favorite extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            list: this.getFavorites() || [],
        };

        this.host = document.createElement('div');
        this.host.classList.add('favorite');


        this.addButton = document.createElement('button');
        this.addButton.classList.add('favorite__add');
        this.addButton.innerText = 'add to favorite';



        this.clearButton = document.createElement('button');
        this.clearButton.classList.add('favorite__clear');
        this.clearButton.innerText = 'clear favorites';


        this.addToFavorite = this.addToFavorite.bind(this);
        this.clearFavorite = this.clearFavorite.bind(this);
        this.handleClick = this.handleClick.bind(this);


        this.addButton.addEventListener('click', this.addToFavorite);
        this.clearButton.addEventListener('click', this.clearFavorite);
    }

    handleClick(ev) {
        ev.preventDefault();
        const city = event.target.innerText;
        this.props.onClick(city);
    }

    getFavorites() {
        const list = JSON.parse(window.localStorage.getItem('favorites'));
        return list;
    }

    addToFavorite() {
        const list = this.state.list.slice();
        const city = this.props.city;
        const isExist = this.checkCities(city);
        if (isExist) {
            return;
        } else {
            list.push(city);
            const listString = JSON.stringify(list);
            localStorage.setItem('favorites', listString);
            this.updateState({ list });
        }
    }

    clearFavorite() {
        localStorage.removeItem('favorites');
        this.updateState({ list: [] });
    }

    checkCities(city) {
        const list = this.state.list;
        return list.includes(city);
    }

    showFavorites(list) {
        const host = document.createElement('ul');
        host.classList.add('favorite__cities');
        
        list.forEach(element => {
            const item = document.createElement('li');
            const button = document.createElement('button');
            button.addEventListener('click', this.handleClick);

            item.classList.add('favorite__city');
            button.classList.add('favorite__city-button');
            item.appendChild(button);

            button.innerHTML = element;
            host.appendChild(item);
        });
        return host;
    }


    render() {
        const list = this.state.list;
        if (this.state.list) {
            return [
                this.addButton,
                this.clearButton,
                this.showFavorites(list)
            ];
        } else
            return this.button;
    }
    
}

export default Favorite;