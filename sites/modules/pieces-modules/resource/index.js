module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Patient Health Resource',
    pluralLabel: 'Patient Health Resources',
    openGraph: false,
    seoFields: false
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Resource Title',
        required: true
      },
      summary: {
        type: 'string',
        label: 'Summary',
        textarea: true
      },
      body: {
        type: 'string',
        label: 'Body Content',
        textarea: true
      },
      _relatedCondition: {
        type: 'relationship',
        label: 'Related Condition',
        withType: 'condition',
        max: 1,
      },
      _relatedProducts: {
        type: 'relationship',
        label: 'Related Products',
        withType: 'product',
        multiple: true
      },
      downloadableFiles: {
        type: 'array',
        label: 'Downloadable Files',
        fields: {
          add: {
            fileName: {
              type: 'string',
              label: 'File Name'
            },
            file: {
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
        fields: ['title', 'summary', 'body']
      },
      relationships: {
        label: 'Relationships',
        fields: ['_relatedCondition', '_relatedProducts']
      },
      resources: {
        label: 'Resources',
        fields: ['downloadableFiles']
      }
    }
  }
}; 