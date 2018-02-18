import '../scss/main.scss';
import elements from './elements';
import OnInit from './init';
import { Coordinates, Weather } from './utils/api';
import Render from './render';






elements.header.addEventListener('click', ({ target }) => {
    if (target === elements.search.button) {
        new Coordinates(elements.search.input.value.trim()).getData()
            .then(results => {
                new Weather(results).getAll().then(([current, week]) => {
                    new Render(current, week);
                });
            });
    }
});

new OnInit('London, UK');