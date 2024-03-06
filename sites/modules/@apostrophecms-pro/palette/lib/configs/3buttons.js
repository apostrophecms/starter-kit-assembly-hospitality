const choices = require('../choices');

module.exports = {
  add: {
    buttonVPadding: {
      label: 'Vertical Padding',
      type: 'range',
      selector: [ '.btn', '.my-form__submit' ],
      property: [ 'padding-top', 'padding-bottom' ],
      unit: 'px',
      min: 5,
      max: 20,
      def: 10,
      step: 1
    },
    buttonHPadding: {
      label: 'Horizontal Padding',
      type: 'range',
      selector: [ '.btn', '.my-form__submit' ],
      property: [ 'padding-left', 'padding-right' ],
      unit: 'px',
      min: 5,
      max: 40,
      def: 10,
      step: 1
    },
    buttonBorderRadius: {
      label: 'Border Radius',
      type: 'range',
      selector: [ '.btn', '.my-form__submit' ],
      property: 'border-radius',
      unit: 'px',
      min: 0,
      max: 100,
      def: 4,
      step: 1
    },
    buttonFont: {
      label: 'Font',
      type: 'select',
      selector: [ '.btn', '.my-form__submit' ],
      property: 'font-family',
      choices: choices.BASE_FONTS
    },
    buttonSize: {
      label: 'Text Size',
      type: 'range',
      selector: [ '.btn', '.my-form__submit' ],
      property: 'font-size',
      unit: 'px',
      min: 9,
      max: 24,
      def: 12
    },
    buttonBackground: {
      label: 'Button Background Color',
      type: 'color',
      selector: [ '.btn--primary', '.my-form__submit' ],
      property: 'background-color',
      def: '#76fac1'
    },
    buttonBackgroundHover: {
      label: 'Button Background Color (Hover)',
      type: 'color',
      selector: [ '.btn--primary:hover', '.my-form__submit:hover' ],
      property: 'background-color',
      def: '#76fac1'
    },
    buttonColor: {
      label: 'Button Text Color',
      type: 'color',
      selector: [ '.btn--primary', '.my-form__submit' ],
      property: 'color',
      def: '#0b1f9c'
    },
    secondaryButtonBackground: {
      label: 'Secondary Button Background Color',
      type: 'color',
      selector: '.btn--secondary',
      property: 'background-color',
      def: '#76fac1'
    },
    secondaryButtonBackgroundHover: {
      label: 'Secondary Button Background Color (Hover)',
      type: 'color',
      selector: '.btn--secondary:hover',
      property: 'background-color',
      def: '#76fac1'
    },
    secondaryButtonColor: {
      label: 'Secondary Button Text Color',
      type: 'color',
      selector: '.btn--secondary',
      property: 'color',
      def: '#0b1f9c'
    }
  },
  group: {
    buttons: {
      label: 'Buttons',
      group: {
        buttonStyle: {
          label: 'Button Style',
          fields: [
            'buttonFont',
            'buttonSize',
            'buttonHPadding',
            'buttonVPadding',
            'buttonBorderRadius'
          ]
        },
        primary: {
          label: 'Primary Button',
          fields: [
            'buttonBackground',
            'buttonBackgroundHover',
            'buttonColor'
          ]
        },
        secondary: {
          label: 'Secondary Button',
          fields: [
            'secondaryButtonBackground',
            'secondaryButtonBackgroundHover',
            'secondaryButtonColor'
          ]
        }
      }
    }
  }
};
