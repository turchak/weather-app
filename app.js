const secretKey = '74e2fcaef808ae167e9dedf219a7e6a0';
const units = 'si';


const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const cityName = document.querySelector('.city-name');

const current = {
    icon:        document.querySelector('.icon'),
    summary:     document.querySelector('.current-summary'),
    wind:        document.querySelector('.current-wind-num'),
    temperature: document.querySelector('.current-temp'),
    humidity:    document.querySelector('.current-humidity-num'),
    pressure:    document.querySelector('.current-pressure-num')
}

let coordinates = [];

function getData() {
    let latitude = coordinates[0].toString();
    let longitude = coordinates[1].toString();
    let url = "https://api.darksky.net/forecast/" + secretKey + "/" + latitude + "," + longitude + "?units=" + units;
    $.ajax({
        url: url,
        dataType: "jsonp"
    }).done(function (data) {
        let currently = data.currently;
        renderData(currently);
    });
    coordinates.length = 0;
}

// function getDate(data) {
//     let date = new Date(data.time * 1000);
//     let monthArr = ['Junuary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     let month = date.getMonth();
// }


class Weather {
    constructor(entry) {
        this.icon = entry.icon;
        this.summary = entry.summary;
        this.wind = entry.wind;
        this.temperature = entry.temperature;
        this.humidity = entry.humidity;
        this.pressure = entry.pressure;
    }

    getIcon(data) {
        this.icon.className = 'icon wi';
        let dataIcon = data.icon;
        switch (dataIcon) {
            case "partly-cloudy-night" : this.icon.classList.add("wi-night-alt-cloudy");
                break;

            case "clear-night" : this.icon.classList.add("wi-night-clear");
                break;

            case "cloudy" : this.icon.classList.add("wi-cloud");
                break;

            case "clear-day" : this.icon.classList.add("wi-day-sunny");
                break;

            case "rain" : this.icon.classList.add("wi-rain");
                break;

            case "partly-cloudy-day" : this.icon.classList.add("wi-cloudy");
                break;
            case "snow" : this.icon.classList.add("wi-snow");
        }
    }

    getSummary(data) {
        this.summary.innerHTML = data.summary;
    }

    getWind(data) {
        this.wind.innerHTML = Math.round(data.windSpeed);
    }

    getTemperature(data) {
        this.temperature.innerHTML = Math.round(data.temperature);
    }

    getHumidity(data) {
        this.humidity.innerHTML = Math.round(data.humidity);
    }

    getPressure(data) {
        this.pressure.innerHTML = Math.round(data.pressure);
    }

}


let currentWeather = new Weather(current);


function renderData(data) {
    currentWeather.getSummary(data);
    currentWeather.getIcon(data);
    currentWeather.getTemperature(data);
    currentWeather.getWind(data);
    currentWeather.getHumidity(data);
    currentWeather.getPressure(data);
}

function getCoordinates(city) {
    let geocoder = new google.maps.Geocoder(city);
    geocoder.geocode({ 'address': city }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
            let lat = results[0].geometry.location.lat();
            let lng = results[0].geometry.location.lng();
            let name = results[0].address_components[0].long_name;
            cityName.innerHTML = name;
            coordinates.push(lat, lng);
            getData();
        } else {
            console.log("Something got wrong " + status);
        }
    });
}

searchButton.addEventListener('click', () => {
    let inputValue = searchInput.value;
    getCoordinates(inputValue);
})



