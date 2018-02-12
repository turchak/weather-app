const elements = {
    header: document.querySelector('.header'),
    search: {
        button: document.querySelector('.search__button'),
        input:  document.querySelector('.search__input'),
    },
    current: {
        city:     document.querySelector('.city-name'),
        icon:     document.querySelector('.icon'),
        humidity: document.querySelector('.current-humidity-num'),
        pressure: document.querySelector('.current-pressure-num'),
        summary:  document.querySelector('.current-summary'),
        temp:     document.querySelector('.current-temp'),
        wind:     document.querySelector('.current-wind-num'),
    }
};

export default elements;