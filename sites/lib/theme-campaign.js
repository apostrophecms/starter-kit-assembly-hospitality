module.exports = function(site, config) {
  config.modules = {
    ...config.modules,
    
    // Theme specific Assets and Helpers
    'theme-campaign': {},

    // Theme specific Pieces
    article: {},
    cta: {},

    // Related Pieces Widgets

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
            label: 'Campaign Content',
            items: [
              'article',
              'cta',
              '@apostrophecms/form'
            ]
          }
        ]
      }
    }
  };
};