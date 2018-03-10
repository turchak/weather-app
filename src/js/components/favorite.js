import Component from '../st/component';

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.host = document.createElement('div');
        this.host.classList.add('.favorite');
        this.handleClick = this.handleClick.bind(this);
        this.button = document.createElement('button');
        this.button.classList.add('add-favorite');
        this.button.addEventListener('click', this.handleClick);
    }

    handleClick(ev) {
        ev.preventDefault();
        this.props.onClick();
    }

    render() {
        return this.button;
    }
    
}

export default Favorite;