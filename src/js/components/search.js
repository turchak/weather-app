import Component from '../st/component';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { isValid: true };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.host = document.createElement('div');
        this.host.classList.add('search-container');
        this.host.addEventListener('submit', this.handleSubmit);

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.setAttribute('placeholder', 'Type location...');
        this.input.setAttribute('required', '');
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
        return `
        <form class=${ isValid ? '"search"' : '"search-invalid"'}>
            <input name='search' required class='search__input' value='${ city }'>
            <button class='search__button'>Start</button>
        </form>`;
    }
}

export default Search;