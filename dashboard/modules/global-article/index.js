module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Article',
    pluralLabel: 'Articles',
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title',
        required: true
      },
      description: {
        type: 'string',
        label: 'Description',
        textarea: true
      },
      body: {
        type: 'string',
        label: 'Body Content',
        textarea: true
      },
      image: {
        type: 'area',
        label: 'Featured Image',
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
        fields: ['title', 'description', 'body', 'image']
      }
    }
  }
}; 