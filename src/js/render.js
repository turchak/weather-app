import elements from './elements';

class Render {
    constructor(current, week) {
        this.info = {
            current: current.data[0],
            forecast: week.data
        };
        this.showCurrent();
        this.showForecast();
    }
    
    showCurrent() {
        const icon = this.showIcon(this.info.current.weather.icon);
        const currentHtml = `
        <div class="current__detail">
        <div class="current__info current__info--wind">
            <span class="current__label current__label--wind">Wind:</span>
            <span class="current__num current__num--wind">${this.info.current.wind_spd}</span>
            <span class="current__unit current__unit--wind">m/s</span>
        </div>
        <div class="current__info current__info--humidity">
            <span class="current__label current__label--humidity">Humidity:</span>
            <span class="current__num current__num--humidity">${this.info.current.rh}</span>
            <span class="current__unit current__unit--humidity">%</span>
        </div>
        <div class="current__info current__info--pressure">
            <span class="current__label current__label--pressure">Pressure:</span>
            <span class="current__num current__num--pressure">${this.info.current.pres}</span>
            <span class="current__unit current__unit--pressure">hPa</span>
        </div>
    </div>
    <h2 class="city">${this.info.current.city_name}</h2>
    <div class="current__condition">
        ${icon}   
        <span class="current__condition-temp">${this.info.current.temp}</span>
        <span class="current__condition-summary">${this.info.current.weather.description}</span>
    </div>
        `;
        elements.current.host.innerHTML = currentHtml;
    }

    getUnits(data) {
        let unit = '\u00B0';
        switch(data) {
        case 'M':
            unit = unit + 'С';
            break;
            
        case 'I':
            unit = unit + 'F';
            break;
        }
        return unit;
    }

    showForecast() {
        const days = this.info.forecast;
        const period = document.querySelector('.days');
        const list = document.importNode(elements.forecast.days, true);
        list.innerHTML = '';


        const showDay = day => {
            elements.forecast.date.innerHTML    = this.convertDate(day.ts);
            elements.forecast.summary.innerHTML = day.weather.description;
            elements.forecast.temp.innerHTML    = day.temp;
            this.showIcon(day.weather.icon);
            const container = document.importNode(elements.forecast.day, true);
            return container;
        };
        
        days.forEach( day => {
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

    showIcon(dataIcon) {
        let icon;
        function getIcon(x) {
            return `<i class="icon wi ${x}"></i>`;
        }

        switch (dataIcon) {
        case 't01d':
        case 't02d':
        case 't03d':
            icon = getIcon('wi-day-thunderstorm');
            break;
        
        case 't01n':
        case 't02n':
        case 't03n':
            icon = getIcon('wi-night-alt-thunderstorm');
            break;

        case 't04d':
        case 't05d':
            icon = getIcon('wi-day-lightning');
            break;

        case 't04n':
        case 't05n':
            icon = getIcon('wi-night-lightning');
            break;

        case 'd01d':
        case 'd02d':
        case 'd03d':
            icon = getIcon('wi-day-sleet');
            break;  
            
        case 'd01n':
        case 'd02n':
        case 'd03n':
            icon = getIcon('wi-night-alt-sleet');
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
            icon = getIcon('wi-rain');
            break;
        
        case 'r03d':
        case 'r03n':
            icon = getIcon('wi-day-rain-wind');
            break;

        case 'r05d':
            icon = getIcon('wi-day-showers');
            break;

        case 'r05n':
        case 'r06n':
            icon = getIcon('wi-night-alt-showers');
            break;

        case 's01d':
        case 's04d':
            icon = getIcon('wi-day-snow');
            break;

        case 's01n':
        case 's04n':
            icon = getIcon('wi-night-alt-snow');
            break;

        case 's02d':
        case 's02n':
        case 's03d':
        case 's03n':
            icon = getIcon('wi-snow-wind');
            break;

        case 's05d':
        case 's05n':
            icon = getIcon('wi-cloudy-gusts');
            break;
        
        case 's06d':
        case 's06n':
            icon = getIcon('wi-snow');
            break;
        
        case 'a01d':
        case 'a02d':
        case 'a03d':
        case 'a04d':
        case 'a05d':
        case 'a06d':
            icon = getIcon('wi-day-fog');
            break;
        
        case 'a01n':
        case 'a02n':
        case 'a03n':
        case 'a04n':
        case 'a05n':
        case 'a06n':
            icon = getIcon('wi-night-fog');
            break;
        
        case 'c01d':
            icon = getIcon('wi-day-sunny');
            break;
        
        case 'c01n':
            icon = getIcon('wi-night-clear');
            break;

        case 'c02d':
        case 'c03d':
            icon = getIcon('wi-day-cloudy');
            break;

        case 'c02n':
        case 'c03n':
            icon = getIcon('wi-night-alt-cloudy');
            break;

        case 'c04d':
            icon = getIcon('wi-day-cloudy-high');
            break;

        case 'c04n':
            icon = getIcon('wi-night-alt-cloudy-high');
            break; 
        }

        return icon;
    }
}

export default Render;