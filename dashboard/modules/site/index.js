import themes from '../../../themes.js';

export default {
  improve: 'site',
  fields: {
    add: {
      theme: {
        type: 'select',
        label: 'Theme',
        choices: themes,
        def: themes[0].value,
        required: true
      }
    }
  }
};
