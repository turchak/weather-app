import Component from '../st/component';

class Units extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: localStorage.units || 'M'
        };
        this.changeUnits = this.changeUnits.bind(this);
        this.host = document.createElement('div');
        this.host.classList.add('units');

        this.celsiusInput = document.createElement('input');
        this.fahrenheitInput = document.createElement('input');

        this.celsiusInput.type = 'radio';
        this.celsiusInput.name = 'units';
        this.celsiusInput.checked = true;
        this.celsiusInput.dataset.units = 'C';
        this.celsiusInput.value = 'M';
        
        this.fahrenheitInput.type = 'radio';
        this.fahrenheitInput.name = 'units';
        this.fahrenheitInput.dataset.units = 'F';
        this.fahrenheitInput.value = 'I';

        this.celsiusInput.addEventListener('change', this.changeUnits);
        this.fahrenheitInput.addEventListener('change', this.changeUnits);
        this.setChecked(this.celsiusInput, this.fahrenheitInput);
    }

    changeUnits(ev) {
        const units = ev.target.value;
        localStorage.setItem('units', units);
        this.props.onSwitch(units);
    }

    setChecked(a,b) {
        if(this.state.units === 'M') {
            a.checked = true;
        } else {
            b.checked = true;
        }
    }

    render() {
        return [
            this.celsiusInput,
            this.fahrenheitInput
        ];
    }
}

export default Units;