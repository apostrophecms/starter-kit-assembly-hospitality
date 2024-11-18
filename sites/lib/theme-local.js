export default function(site, config) {
  config.modules = {
    ...config.modules,

    // Theme specific Assets and Helpers
    'theme-local': {},

    // Theme specific Pieces
    service: {},
    job: {},
    article: {},

    // Admin Bar config
    '@apostrophecms/admin-bar': {
      options: {
        groups: [
          {
            label: 'Media',
            items: [
              '@apostrophecms/image',
              '@apostrophecms/file',
              '@apostrophecms/image-tag',
              '@apostrophecms/file-tag'
            ]
          },
          {
            label: 'General Content',
            items: [
              'article',
              '@apostrophecms/form'
            ]
          },
          {
            label: 'Local Agency Content',
            items: [
              'service',
              'job'
            ]
          },
        ]
      }
    }
  };
};
