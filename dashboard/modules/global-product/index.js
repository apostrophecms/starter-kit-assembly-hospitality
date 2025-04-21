module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product',
    pluralLabel: 'Products',
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Product Title',
        required: true
      },
      productId: {
        type: 'string',
        label: 'Product ID',
        required: true
      },
      description: {
        type: 'string',
        label: 'Description',
        textarea: true
      },
      specifications: {
        type: 'array',
        label: 'Specifications',
        fields: {
          add: {
            key: {
              type: 'string',
              label: 'Specification Name'
            },
            value: {
              type: 'string',
              label: 'Specification Value'
            }
          }
        }
      },
      image: {
        type: 'area',
        label: 'Product Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'productId', 'description', 'image']
      },
      specifications: {
        label: 'Specifications',
        fields: ['specifications']
      }
    }
  }
}; 