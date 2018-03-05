class Search {
    constructor() {
        this.props = {};
        this.state = {
            isValid: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.host = document.createElement('div');
        this.host.classList.add('search-container');
        this.host.addEventListener('submit', this.handleSubmit); 
    }

    updateState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
        this.render();
    }

    update(nextProps) {
        this.props = nextProps;
        return this.render();
    }

    getState() {
        const city = document.querySelector('.search__input').value.trim();
        return city;
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const city = ev.target.elements.search.value.trim();
        
        if (!city.length) {
            this.updateState({ isValid: false });
        } else {
            this.props.onSubmit(city);
        }
    }
    runAutoComplete() {
        new google.maps.places.Autocomplete((document.querySelector('.search__input')), {
            types: ['(cities)']
        });
    }

    render() {
        const { isValid } = this.state;
        const { city } = this.props;
    
        this.host.innerHTML = `
          <form class=${ isValid ? '"search"' : '"search-invalid"'}>
            <input name='search' required class='search__input' value='${ city }'>
            <button class='search__button'>Start</button>
          </form>`;
        return this.host;
    }
}

export default Search;