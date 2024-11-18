export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Regional Office',
    pluralLabel: 'Regional Offices',
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Region Name',
        required: true
      },
      description: {
        type: 'string',
        label: 'Short Description',
        textarea: true,
        required: false
      },
      location: {
        type: 'string',
        label: 'Office Address',
        required: true
      },
      contactInfo: {
        type: 'object',
        label: 'Contact Information',
        fields: {
          add: {
            phone: {
              type: 'string',
              label: 'Phone Number'
            },
            email: {
              type: 'email',
              label: 'Email Address'
            }
          }
        }
      },
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'description', 'location', 'contactInfo']
      }
    }
  }
};