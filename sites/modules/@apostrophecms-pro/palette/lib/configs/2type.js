import choices from '../choices.js';

const h1 = baseProperties('heading1', 'Heading 1', '[data-rich-text] h1, [contenteditable] h1', 48);
const h2 = baseProperties('heading2', 'Heading 2', '[data-rich-text] h2, [contenteditable] h2', 40);
const h3 = baseProperties('heading3', 'Heading 3', '[data-rich-text] h3, [contenteditable] h3', 32);
const p = baseProperties('body', 'Body Copy', '[data-rich-text] p, [contenteditable] p', 16);

export default {
  add: {
    ...h1.fields,
    ...h2.fields,
    ...h3.fields,
    ...p.fields
  },
  group: {
    typography: {
      label: 'Typography',
      group: {
        [h1.groupName]: {
          label: h1.label,
          fields: Object.keys(h1.fields)
        },
        [h2.groupName]: {
          label: h2.label,
          fields: Object.keys(h2.fields)
        },
        [h3.groupName]: {
          label: h3.label,
          fields: Object.keys(h3.fields)
        },
        [p.groupName]: {
          label: p.label,
          fields: Object.keys(p.fields)
        }
      }
    }
  }
};

function baseProperties(name, label, selector, fontSize) {
  return {
    name,
    label,
    selector,
    groupName: `${name}Group`,
    fields: {
      [`${name}Font`]: {
        label: 'Font',
        type: 'select',
        selector,
        property: 'font-family',
        choices: choices.BASE_FONTS,
        def: '"Abril Fatface", serif'
      },
      [`${name}Size`]: {
        label: 'Size',
        type: 'range',
        selector,
        property: 'font-size',
        unit: 'px',
        min: 10,
        max: 120,
        def: fontSize
      },
      [`${name}LetterSpacing`]: {
        label: 'Letter Spacing',
        type: 'range',
        selector,
        property: 'letter-spacing',
        unit: 'px',
        min: 0,
        max: 5,
        def: 0.5,
        step: 0.25
      },
      [`${name}Color`]: {
        label: 'Color',
        type: 'color',
        selector,
        property: 'color',
        def: '#000000'
      },
      [`${name}LineHeight`]: {
        label: 'Line Height',
        type: 'range',
        selector,
        property: 'line-height',
        min: 0.5,
        max: 3,
        def: 1.2,
        step: 0.1
      }
    }
  };
};
