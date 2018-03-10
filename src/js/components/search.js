import Component from '../st/component';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { isValid: true };
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

    _render() {
        const children = this.render();

        this.host.innerHTML = '';
        if (typeof children === 'string') {
            this.host.innerHTML = children;
        } else if (Array.isArray(children)) {
            this.host.append(...children);
        } else {
            this.host.append(children);
        }

        return this.host;
    }

    render() {
        const { isValid } = this.state;
        const { city } = this.props;
        return `
        <form class=${ isValid ? '"search"' : '"search-invalid"' }>
            <input name='search' required class='search__input' value='${ city }'>
            <button class='search__button'>Start</button>
        </form>`;
    }
}

export default Search;