const choices = require('../choices');

module.exports = {
  add: {
    backgroundColor: {
      label: 'Site Background Color',
      type: 'color',
      selector: '[data-apos-refreshable]',
      property: 'background-color',
      def: '#fefefe'
    },
    borderWidth: {
      label: 'Site Border',
      type: 'range',
      selector: '[data-apos-refreshable]',
      property: 'border-width',
      def: '2',
      unit: 'px',
      min: 0,
      max: 10
    },
    borderColor: {
      label: 'Site Border Color',
      type: 'color',
      selector: '[data-apos-refreshable]',
      property: 'border-color',
      def: '#1e1e1e'
    },
    siteWidth: {
      label: 'Site Width',
      type: 'range',
      selector: '[data-apos-refreshable]',
      property: 'max-width',
      def: '90',
      unit: 'vw',
      min: 50,
      max: 100
    },
    contentSpacing: {
      label: 'Widget Spacing',
      type: 'range',
      selector: '.widget-my-spacing',
      property: 'margin-bottom',
      def: '20',
      unit: 'px',
      min: 5,
      max: 80
    }
    // accentColor: {
    //   label: 'Accent Color',
    //   type: 'color',
    //   help: 'The accent color of butons around the site',
    //   selector: ':root',
    //   property: '--accent-color',
    //   def: '#76fac1'
    // },
    // accentColorContrast: {
    //   label: 'Accent Color Contrast',
    //   type: 'color',
    //   help: 'This color is used to style text inside accented buttons',
    //   selector: ':root',
    //   property: '--accent-color-contrast',
    //   def: '#0b1f9c'
    // },
    // secondaryAccentColor: {
    //   label: 'Secondary Accent Color',
    //   type: 'color',
    //   help: 'The accent color of butons around the site',
    //   selector: ':root',
    //   property: '--secondary-accent-color',
    //   def: '#76fac1'
    // },
    // secondaryAccentColorContrast: {
    //   label: 'Secondary Accent Color Contrast',
    //   type: 'color',
    //   help: 'This color is used to style text inside accented buttons',
    //   selector: ':root',
    //   property: '--secondary-accent-color-contrast',
    //   def: '#0b1f9c'
    // }
  },
  group: {
    site: {
      label: 'Site Settings',
      fields: [
        'backgroundColor',
        'borderWidth',
        'borderColor',
        'siteWidth',
        'contentSpacing'
        // 'accentColor',
        // 'accentColorContrast',
        // 'secondaryAccentColor',
        // 'secondaryAccentColorContrast'
      ]
    },
    // typography: {
    //   label: 'Typography',
    //   group: {
    //     default: {
    //       label: 'Default',
    //       fields: [
    //         'baseFont',
    //         'baseFontSize',
    //         'baseFontColor'
    //       ]
    //     },
    //     title: {
    //       label: 'Title',
    //       fields: [
    //         'titleFont',
    //         'titleFontColor'
    //       ]
    //     },
    //     button: {
    //       label: 'Buttons',
    //       fields: [
    //         'buttonFont'
    //       ]
    //     }
    //   }
    // }
  }
};
