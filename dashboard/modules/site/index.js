const themes = require('../../../themes');

module.exports = {
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
