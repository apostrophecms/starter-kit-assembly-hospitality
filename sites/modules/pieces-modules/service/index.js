module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Service',
    pluralLabel: 'Services',
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Service Name',
        required: true
      },
      description: {
        type: 'string',
        label: 'Service Description',
        textarea: true,
      },
      category: {
        type: 'select',
        label: 'Category',
        choices: [
          { label: 'Health', value: 'health' },
          { label: 'Transportation', value: 'transportation' },
          { label: 'Public Safety', value: 'public-safety' },
          { label: 'Education', value: 'education' },
          { label: 'Environment', value: 'environment' },
          { label: 'Other', value: 'other' }
        ],
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
            },
            website: {
              type: 'url',
              label: 'Website'
            }
          }
        }
      },
      documents: {
        type: 'array',
        label: 'Related Documents',
        fields: {
          add: {
            documentName: {
              type: 'string',
              label: 'Document Name',
            },
            documentFile: {
              type: 'attachment',
              label: 'File',
              fileGroup: 'office'
            }  
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'description', 'category']
      },
      resources: {
        label: 'Resources',
        fields: ['contactInfo', 'documents']
      }
    }
  }
};