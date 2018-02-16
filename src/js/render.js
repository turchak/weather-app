import elements from './elements';

class Render {
    constructor() {
        this.info = {};
    }
    
    showCurrent(data) {
        const current = {
            humidity: data.weather.rh,
            city:     data.coordinates.city,
            pressure: data.weather.pres,
            summary:  data.weather.weather.description,
            temp:     data.weather.temp,
            wind:     data.weather.wind_spd,
            icon:     data.weather.weather.icon
        };
        this.info.current = current;
        elements.current.city.innerHTML     = this.info.current.city;
        elements.current.humidity.innerHTML = this.info.current.humidity;
        elements.current.pressure.innerHTML = this.info.current.pressure;
        elements.current.summary.innerHTML  = this.info.current.summary;
        elements.current.temp.innerHTML     = this.info.current.temp;
        elements.current.wind.innerHTML     = this.info.current.wind;
        this.showIcon(this.info.current.icon, elements.current.icon);     
    }

    showForecast(data) {
        this.info.forecast = [];
        const days = data.forecast;
        const period = document.querySelector('.days');
        days.forEach(day => {
            this.info.forecast.push(day);
        });
        const list = document.importNode(elements.forecast.days, true);
        list.innerHTML = '';


        const showDay = day => {
            elements.forecast.date.innerHTML    = this.convertDate(day.ts);
            elements.forecast.summary.innerHTML = day.weather.description;
            elements.forecast.temp.innerHTML    = day.temp;
            this.showIcon(day.weather.icon, elements.forecast.icon);
            const container = document.importNode(elements.forecast.day, true);
            return container;
        };
        
        this.info.forecast.forEach((day) => {
            list.appendChild(showDay(day));
        });

        period.parentNode.replaceChild(list, period);
    }

    convertDate(date) {
        const convertDow = dow => { 
            let result;
            switch(dow) {
            case 0:
                result = 'Sun';
                break;

            case 1:
                result = 'Mon';
                break;

            case 2:
                result = 'Tue';
                break;

            case 3:
                result = 'Wed';
                break; 

            case 4:
                result = 'Thu';
                break;

            case 5:
                result = 'Fri';
                break;

            case 6:
                result = 'Sat';
                break;                      
            }
            return result;    
        };

        const convertMonth = month => {
            let result;
            switch(month) {
            case 0:
                result = 'Jan';
                break;

            case 1:
                result = 'Feb';
                break;

            case 2:
                result = 'Mar';
                break;

            case 3:
                result = 'Apr';
                break; 

            case 4:
                result = 'May';
                break;

            case 5:
                result = 'June';
                break;

            case 6:
                result = 'July';
                break;
                
            case 7:
                result = 'Aug';
                break;

            case 8:
                result = 'Sept';
                break;

            case 9:
                result = 'Oct';
                break;

            case 10:
                result = 'Nov';
                break;

            case 11:
                result = 'Dec';
                break;                                            
            }
            return result;   
        };


        const time = new Date(date*1000);
        const day = time.getDate();
        const dow = convertDow(time.getDay());
        const month = convertMonth(time.getMonth());
        const period = dow + ' ' + day + ' ' + month;
        
        return period;
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
        
        case 'c01d':
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
}

export default Render;