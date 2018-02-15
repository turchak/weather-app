const elements = {
    header: document.querySelector('.header'),
    content: document.querySelector('.content'),
    search: {
        button: document.querySelector('.search__button'),
        input:  document.querySelector('.search__input'),
    },
    current: {
        city:     document.querySelector('.city'),
        icon:     document.querySelector('.icon'),
        humidity: document.querySelector('.current__num--humidity'),
        pressure: document.querySelector('.current__num--pressure'),
        summary:  document.querySelector('.current__condition-summary'),
        temp:     document.querySelector('.current__condition-temp'),
        wind:     document.querySelector('.current__num--wind'),
    },
    forecast: {
        date:    document.querySelector('.day__title'),
        day:     document.querySelector('.day'),
        days:    document.querySelector('.days'),
        icon:    document.querySelector('.day__icon'),
        summary: document.querySelector('.day__summary'),
        temp:    document.querySelector('.day__temp')
    }
};

export default elements;