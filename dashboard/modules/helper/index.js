const baseTextToolbar = [
  'Styles',
  'Bold', 'Italic', 'Link', 'Unlink',
  'Split', 'NumberedList', 'BulletedList'
];
const baseTextStyles = [
  {
    name: 'Body',
    element: 'p'
  }
];
const widgets = {
  gallery: {}
};

export default {
  options: {
    alias: 'helpers',
    baseTextStyles,
    baseTextToolbar
  },
  helpers(self, options) {
    return {
      baseTextStyles,
      baseTextToolbar,
      widgets
    };
  }
};
