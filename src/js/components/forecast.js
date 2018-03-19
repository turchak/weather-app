import showIcon from '../utils/icon';
import convertDate from '../utils/date';
import Component from '../st/component';

class Forecast extends Component{
    constructor(props) {
        super(props);
        this.host = document.createElement('div');
        this.host.classList.add('days');
    }

    createDayElement(data) {
        const day = document.createElement('li');
        day.classList.add('day');

        day.innerHTML = `
        <h3 class="day__title">${convertDate(data.ts)}</h3>
        <span class="day__temp">${data.temp}</span>
        <span class="day__icon">${showIcon(data.weather.icon)}</span>
        <span class="day__summary">${data.weather.description}</span>
        `;
        return day;
    }

    render() {
        return this.props.week.data.map(this.createDayElement);
    }
}

export default Forecast;