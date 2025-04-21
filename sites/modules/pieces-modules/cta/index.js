module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Call to Action',
    pluralLabel: 'Calls to Action',
    openGraph: false,
    seoFields: false
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Internal Label',
        required: true
      },
      headline: {
        type: 'string',
        label: 'Headline',
      },
      body: {
        type: 'string',
        label: 'Supporting Text',
      },
      buttonText: {
        type: 'string',
        label: 'Button Text',
      },
      buttonUrl: {
        type: 'url',
        label: 'Button URL',
      },
      style: {
        type: 'select',
        label: 'Button Style',
        choices: [
          {
            label: 'Primary',
            value: 'primary'
          },
          {
            label: 'Secondary',
            value: 'secondary'
          },
          {
            label: 'Outline',
            value: 'outline'
          }
        ]
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'headline', 'body']
      },
      button: {
        label: 'Button Settings',
        fields: ['buttonText', 'buttonUrl', 'style']
      }
    }
  }
}; 