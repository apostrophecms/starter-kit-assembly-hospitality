module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Condition',
    pluralLabel: 'Conditions',
    openGraph: false,
    seoFields: false
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Condition Title',
        required: true
      },
      description: {
        type: 'string',
        label: 'Description',
        textarea: true
      },
      icon: {
        type: 'attachment',
        label: 'Icon',
        fileGroup: 'images'
      },
      _relatedResources: {
        type: 'relationship',
        label: 'Related Health Resources',
        withType: 'resource',
        reverseOf: 'relatedConditions',
        multiple: true
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'description', 'icon']
      },
      relationships: {
        label: 'Relationships',
        fields: ['_relatedResources']
      }
    }
  }
}; 