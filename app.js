const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const cityName = document.querySelector('.city-name');
let coordinates = [];

const current = {
    icon: document.querySelector('.icon'),
    summ: document.querySelector('.current-summary'),
    wind: document.querySelector('.current-wind-num'),
    temperature: document.querySelector('.current-temp'),
    humidity: document.querySelector('.current-humidity-num'),
    pressure: document.querySelector('.current-pressure-num')
}

const darkSky = {
    url: 'https://api.darksky.net/forecast/',
    key: '74e2fcaef808ae167e9dedf219a7e6a0',
    units: ['si', 'us']
}

class Forecast {
    constructor(entry) {
        this.url = entry.url;
        this.key = entry.key;
        this.units = entry.units;
        this.temp = (time, data) => {
            time.getTemperature(data)
        };
        this.summ = (time, data) => {
            time.getSummary(data)
        };
        this.icon = (time, data) => {
            time.getIcon(data)
        };
        this.wind = (time, data) => {
            time.getWind(data)
        };
        this.humidity = (time, data) => {
            time.getHumidity(data)
        };
        this.pressure = (time, data) => {
            time.getPressure(data)
        };
    }

    getDataCurrenly(weather) {
        let latitude = coordinates[0].toString();
        let longitude = coordinates[1].toString();
        let url = this.url + this.key + "/" + latitude + "," + longitude + "?units=" + this.units[0];
        $.ajax({
            url: url,
            dataType: "jsonp"
        }).done((data) => {
            let currently = data.currently;
            this.temp(weather, currently);
            this.summ(weather, currently);
            this.icon(weather, currently);
            this.wind(weather, currently);
            this.humidity(weather, currently);
            this.pressure(weather, currently);
            console.log('curent')
        });
        coordinates.length = 0;
    }

    getDataHourly() {
        let latitude = coordinates[0].toString();
        let longitude = coordinates[1].toString();
        let url = this.url + this.key + "/" + latitude + "," + longitude + "?units=" + this.units[0];
        $.ajax({
            url: url,
            dataType: "jsonp"
        }).done((data) => {
            let hourly = data.hourly.data;
            let hourTemps = document.querySelectorAll('.hour-temp');
            let hourTitles = document.querySelectorAll('.hour-title');
            for(let index = 0; index < 12; index++) {
                hourTemps.forEach((hourTemp, index) => {
                    hourTemp.innerHTML = Math.round(hourly[index].temperature)
                })
                hourTitles.forEach((hourTitle, index) => {
                    hourTitle.innerHTML = getDate(hourly[index]);
                })               
            }
            console.log('hourly');
        });
        coordinates.length = 0;
    }
}

class Weather {
    constructor(entry) {
        this.icon = entry.icon;
        this.summ = entry.summ;
        this.wind = entry.wind;
        this.temperature = entry.temperature;
        this.humidity = entry.humidity;
        this.pressure = entry.pressure;
    }

    getIcon(data) {
        this.icon.className = 'icon wi';
        let dataIcon = data.icon;
        switch (dataIcon) {
            case "partly-cloudy-night": this.icon.classList.add("wi-night-alt-cloudy");
                break;

            case "clear-night": this.icon.classList.add("wi-night-clear");
                break;

            case "cloudy": this.icon.classList.add("wi-cloud");
                break;

            case "clear-day": this.icon.classList.add("wi-day-sunny");
                break;

            case "rain": this.icon.classList.add("wi-rain");
                break;

            case "partly-cloudy-day": this.icon.classList.add("wi-cloudy");
                break;

            case "snow": this.icon.classList.add("wi-snow");
                break;

            case "fog": this.icon.classList.add("wi-fog");
                break;
        }
    }

    getSummary(data) {
        this.summ.innerHTML = data.summary;
    }

    getWind(data) {
        this.wind.innerHTML = Math.round(data.windSpeed);
    }

    getTemperature(data) {
        this.temperature.innerHTML = Math.round(data.temperature);
    }

    getHumidity(data) {
        this.humidity.innerHTML = data.humidity*100;
    }

    getPressure(data) {
        this.pressure.innerHTML = Math.round(data.pressure);
    }
}
function getDate(data) {
    let date = new Date(data.time * 1000);
    let hour = date.getHours();
    return hour + ":00";
    
}
let currentContent = new Weather(current);
let darkSkyForecast = new Forecast(darkSky);


class Coordinates {
    constructor(city) {
        this.city = city;
        this.geocoder = new google.maps.Geocoder(this.city);
    }

    getCoordinatesCurrently(content) {
        this.geocoder.geocode({ 'address': this.city }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let lat = results[0].geometry.location.lat();
                let lng = results[0].geometry.location.lng();
                let name = results[0].address_components[0].long_name;
                cityName.innerHTML = name;
                coordinates.push(lat, lng);
                darkSkyForecast.getDataCurrenly(content);
            } else {
                console.log("Something got wrong " + status);
            }
        });
    }

    getCoordinatesHourly() {
        this.geocoder.geocode({ 'address': this.city }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let lat = results[0].geometry.location.lat();
                let lng = results[0].geometry.location.lng();
                let name = results[0].address_components[0].long_name;
                cityName.innerHTML = name;
                coordinates.push(lat, lng);
                darkSkyForecast.getDataHourly();
            } else {
                console.log("Something got wrong " + status);
            }
        });
    }
}


searchButton.addEventListener('click', () => {
    let inputValue = searchInput.value;
    let googleCoordinates = new Coordinates(inputValue);
    googleCoordinates.getCoordinatesCurrently(currentContent);
    googleCoordinates.getCoordinatesHourly();
});


