import choices from '../choices.js';

const config = {
  add: {
    headerBgColor: {
      label: 'Background color',
      type: 'color',
      selector: '.navigation',
      property: 'background-color',
      def: null
    },
    headerLinkColor: {
      label: 'Link color',
      type: 'color',
      selector: '.navigation__nav-links li a',
      property: 'color',
      def: null
    },
    headerFontSize: {
      label: 'Text Size',
      type: 'range',
      selector: [ '.navigation__nav-links li a', '.navigation__nav-links .link.btn' ],
      property: 'font-size',
      unit: 'px',
      min: 9,
      max: 52,
      def: 12
    },
    headerFont: {
      label: 'Font',
      type: 'select',
      selector: [ '.navigation__nav-links li a', '.navigation__nav-links .link.btn' ],
      property: 'font-family',
      choices: choices.BASE_FONTS
    },
    headerVertPadding: {
      label: 'Vertical Padding',
      type: 'range',
      selector: '.navigation',
      property: [ 'padding-top', 'padding-bottom' ],
      unit: 'rem',
      min: 0.2,
      max: 5,
      def: 1.875,
      step: 0.125
    }
  },
  group: {
    header: {
      label: 'Header Settings',
      fields: [
        'headerBgColor',
        'headerFontSize',
        'headerLinkColor',
        'headerFont',
        'headerVertPadding'
      ]
    }
  }
};

export default config;
