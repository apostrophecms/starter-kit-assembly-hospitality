import { navButton } from './js/nav-buttons.js';
import AOS from 'aos';

export default () => {
  AOS.init();
  navButton();
  // Your own project level JS may go here
};
