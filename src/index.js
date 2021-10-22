/* eslint-disable global-require */
import './assets/css/vendor/bootstrap.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const render = () => {
  import(`./assets/css/sass/themes/light.purplemonster.scss`).then(() => {
    require('./AppRenderer');
  });
};
render();
