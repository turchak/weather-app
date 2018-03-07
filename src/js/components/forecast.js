import showIcon from '../utils/icon';
import convertDate from '../utils/date';
import Component from '../st/component';

class Forecast extends Component{
    constructor(props) {
        super(props);
        this.host = document.createElement('div');
        this.host.classList.add('days');
    }

    render() {
        const days = this.props.week.data;
        const day = data => {
            const item = document.createElement('li');
            item.classList.add('day');
            item.innerHTML = 
            `    <h3 class="day__title">${convertDate(data.ts)}</h3>
                 <span class="day__temp">${data.temp}</span>
                 <span class="day__icon">${showIcon(data.weather.icon)}</span>
                 <span class="day__summary">${data.weather.description}</span>`;
            return item;
        };
        const host = [];
        days.forEach(el => {
            host.push(day(el));
        });
        return host;
    }
}

export default Forecast;