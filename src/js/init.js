import elements from './elements';

class OnInit {
    constructor() {
        this.runAutoComplete();
    }
    runAutoComplete() {
        new google.maps.places.Autocomplete((elements.search.input), {
            types: ['(cities)']
        });
    }
}

export default OnInit;