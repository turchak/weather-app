import Component from '../st/component';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isValid: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.host = document.createElement('div');
        this.host.classList.add('search-container');
        this.host.addEventListener('submit', this.handleSubmit);
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

    render() {
        const { isValid } = this.state;
        const { city } = this.props;
        const form = document.createElement('form');
        const input = document.createElement('input');
        const button = document.createElement('button');
        

        form.classList.add( isValid ? 'search' : 'search-invalid' );
        
        input.classList.add('search__input');
        input.name = 'search';
        input.required = true;
        input.value = city;
        
        button.classList.add('search__button');
        button.innerText = 'start';

        form.append(input, button);
        
        return form;
    }
}

export default Search;