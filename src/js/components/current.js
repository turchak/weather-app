import showIcon from '../utils/icon';
import Component from '../st/component';

class Current extends Component {
    constructor(props) {
        super(props);
        this.host = document.createElement('div');
        this.host.classList.add('current');
    }

    render() {
        if (!!this.props.current) {
            const info = this.props.current.data[0];
            return `
        <div class="current__detail">
        <div class="current__info current__info--wind">
            <span class="current__label current__label--wind">Wind:</span>
            <span class="current__num current__num--wind">${ info.wind_spd }</span>
            <span class="current__unit current__unit--wind">m/s</span>
        </div>
        <div class="current__info current__info--humidity">
            <span class="current__label current__label--humidity">Humidity:</span>
            <span class="current__num current__num--humidity">${ info.rh }</span>
            <span class="current__unit current__unit--humidity">%</span>
        </div>
        <div class="current__info current__info--pressure">
            <span class="current__label current__label--pressure">Pressure:</span>
            <span class="current__num current__num--pressure">${ info.pres }</span>
            <span class="current__unit current__unit--pressure">hPa</span>
        </div>
    </div>
    <h2 class="city">${ info.city_name }</h2>
    <div class="current__condition">
        ${ showIcon(info.weather.icon) }   
        <span class="current__condition-temp">${ info.temp }</span>
        <span class="current__condition-summary">${ info.weather.description }</span>
    </div>
        `;
        }
        else return 'Houston, we have a problem';
        
    }
}

export default Current;
