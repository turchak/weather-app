const secretKey = '74e2fcaef808ae167e9dedf219a7e6a0';
const input = document.querySelector('.search');
const button = document.querySelector('.search-button');

let coordinates = [];

function getData() {
    let latitude = coordinates[0].toString();
    let longitude = coordinates[1].toString();
    let options = {
        // mode : 'no-cors'
    };
    let url = "https://api.darksky.net/forecast/" + secretKey + "/" + latitude + "," + longitude;

    fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    coordinates.length = 0;
}

function getCoordinates(city) {
    let geocoder = new google.maps.Geocoder(city);
    geocoder.geocode({ 'address': city }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
            let lat = results[0].geometry.location.lat();
            let lng = results[0].geometry.location.lng();
            coordinates.push(lat, lng);
            console.log("location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
            getData();
        } else {
            console.log("Something got wrong " + status);
        }
    });
}

button.addEventListener('click', () => {
    let inputValue = input.value;
    getCoordinates(inputValue);
})



