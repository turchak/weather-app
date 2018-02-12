import elements from './elements';

class Render {
    constructor(data) {
        this.info = {
            current:     {
                humidity: data.weather.rh,
                city:     data.coordinates.city,
                pressure: data.weather.pres,
                summary:  data.weather.weather.description,
                temp:     data.weather.temp,
                wind:     data.weather.wind_spd,
                icon:     data.weather.weather.icon
            },
            forecast:    data.forecast
        };
    }
    
    showCurrent() {
        elements.current.city.innerHTML     = this.info.current.city;
        elements.current.humidity.innerHTML = this.info.current.humidity;
        elements.current.pressure.innerHTML = this.info.current.pressure;
        elements.current.summary.innerHTML  = this.info.current.summary;
        elements.current.temp.innerHTML     = this.info.current.temp;
        elements.current.wind.innerHTML     = this.info.current.wind;
        this.showIcon(this.info.current.icon, elements.current.icon);     
    }

    showIcon(dataIcon, icon) {
        icon.className= 'icon wi';
        switch (dataIcon) {
        case 't01d':
        case 't02d':
        case 't03d':
            icon.classList.add('wi-day-thunderstorm');
            break;
        
        case 't01n':
        case 't02n':
        case 't03n':
            icon.classList.add('wi-night-alt-thunderstorm');
            break;

        case 't04d':
        case 't05d':
            icon.classList.add('wi-day-lightning');
            break;

        case 't04n':
        case 't05n':
            icon.classList.add('wi-night-lightning');
            break;

        case 'd01d':
        case 'd02d':
        case 'd03d':
            icon.classList.add('wi-day-sleet');
            break;  
            
        case 'd01n':
        case 'd02n':
        case 'd03n':
            icon.classList.add('wi-night-alt-sleet');
            break;

        case 'r01d':
        case 'r02d':
        case 'r01n':
        case 'r02n':
        case 'f01d':
        case 'f01n':
        case 'r04d':
        case 'r06d':
        case 'u00d':
        case 'u00n':
            icon.classList.add('wi-rain');
            break;
        
        case 'r03d':
        case 'r03n':
            icon.classList.add('wi-day-rain-wind');
            break;

        case 'r05d':
            icon.classList.add('wi-day-showers');
            break;

        case 'r05n':
        case 'r06n':
            icon.classList.add('wi-night-alt-showers');
            break;

        case 's01d':
        case 's04d':
            icon.classList.add('wi-day-snow');
            break;

        case 's01n':
        case 's04n':
            icon.classList.add('wi-night-alt-snow');
            break;

        case 's02d':
        case 's02n':
        case 's03d':
        case 's03n':
            icon.classList.add('wi-snow-wind');
            break;

        case 's05d':
        case 's05n':
            icon.classList.add('wi-cloudy-gusts');
            break;
        
        case 's06d':
        case 's06n':
            icon.classList.add('wi-snow');
            break;
        
        case 'a01d':
        case 'a02d':
        case 'a03d':
        case 'a04d':
        case 'a05d':
        case 'a06d':
            icon.classList.add('wi-day-fog');
            break;
        
        case 'a01n':
        case 'a02n':
        case 'a03n':
        case 'a04n':
        case 'a05n':
        case 'a06n':
            icon.classList.add('wi-night-fog');
            break;
        
        case '01d':
            icon.classList.add('wi-day-sunny');
            break;
        
        case 'c01n':
            icon.classList.add('wi-night-clear');
            break;

        case 'c02d':
        case 'c03d':
            icon.classList.add('wi-day-cloudy');
            break;

        case 'c02n':
        case 'c03n':
            icon.classList.add('wi-night-alt-cloudy');
            break;

        case 'c04d':
            icon.classList.add('wi-day-cloudy-high');
            break;

        case 'c04n':
            icon.classList.add('wi-night-alt-cloudy-high');
            break; 
        }
    }

    showForecast() {
    }
}

export default Render;