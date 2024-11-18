export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Policy',
    pluralLabel: 'Policies',
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Policy Title',
        required: true
      },
      description: {
        type: 'string',
        label: 'Summary',
        textarea: true,
      },
      policyNumber: {
        type: 'string',
        label: 'Policy Number',
      },
      effectiveDate: {
        type: 'date',
        label: 'Effective Date',
      },
      expirationDate: {
        type: 'date',
        label: 'Expiration Date',
      },
      relatedRegions: {
        type: 'relationship',
        label: 'Applicable Regions',
        withType: 'region',
        max: 5,
      },
      policyFile: {
        type: 'attachment',
        label: 'Policy Document',
        fileGroup: 'office'
      },
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'description', 'policyNumber', 'effectiveDate', 'expirationDate']
      },
      relationships: {
        label: 'Relationships',
        fields: ['relatedRegions']
      },
      resources: {
        label: 'Resources',
        fields: ['policyFile']
      }
    }
  }
};