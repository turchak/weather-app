const autoComplete = input => {
    new google.maps.places.Autocomplete((input), {
        types: ['(cities)']
    });
};
export default autoComplete;