import showIcon from '../utils/icon';
import convertDate from '../utils/date';

class Forecast {
    constructor(week) {
        this.host = document.createElement('div');
        this.host.classList.add('days');
        this.info = week.data;
    }

    render() {
        this.host.innerHTML = '';
        const days = this.info;
        const day = data => {
            return `
            <li class="day">
                 <h3 class="day__title">${convertDate(data.ts)}</h3>
                 <span class="day__temp">${data.temp}</span>
                 <span class="day__icon">${showIcon(data.weather.icon)}</span>
                 <span class="day__summary">${data.weather.description}</span>
             </li>`;
        };
        days.forEach(el => {
            this.host.innerHTML += day(el);
        });
        return this.host;
    }
}

export default Forecast;