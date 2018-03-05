import showIcon from '../utils/icon';

class Current {
    constructor(data) {
        this.host = document.createElement('div');
        this.host.classList.add('current');
        this.info = data.data[0];
    }

    render() {
        this.host.innerHTML = '';
        this.host.innerHTML = `
        <div class="current__detail">
        <div class="current__info current__info--wind">
            <span class="current__label current__label--wind">Wind:</span>
            <span class="current__num current__num--wind">${this.info.wind_spd}</span>
            <span class="current__unit current__unit--wind">m/s</span>
        </div>
        <div class="current__info current__info--humidity">
            <span class="current__label current__label--humidity">Humidity:</span>
            <span class="current__num current__num--humidity">${this.info.rh}</span>
            <span class="current__unit current__unit--humidity">%</span>
        </div>
        <div class="current__info current__info--pressure">
            <span class="current__label current__label--pressure">Pressure:</span>
            <span class="current__num current__num--pressure">${this.info.pres}</span>
            <span class="current__unit current__unit--pressure">hPa</span>
        </div>
    </div>
    <h2 class="city">${this.info.city_name}</h2>
    <div class="current__condition">
        ${showIcon(this.info.weather.icon)}   
        <span class="current__condition-temp">${this.info.temp}</span>
        <span class="current__condition-summary">${this.info.weather.description}</span>
    </div>
        `;
        return this.host;
    }
}

export default Current;