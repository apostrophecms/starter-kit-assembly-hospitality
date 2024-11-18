module.exports = function(site, config) {
  config.modules = {
    ...config.modules,

    // Theme specific assets and helpers
    'theme-state': {},

    // Theme specific extensions
    '@apostrophecms-pro/advanced-permission': {},
    '@apostrophecms-pro/advanced-permission-group': {},
    '@apostrophecms-pro/doc-template-library': {},

    // Theme specific pieces
    region: {},
    policy: {},
    job: {},
    article: {},

    // Admin Bar config
    '@apostrophecms/admin-bar': {
      options: {
        groups: [
          {
            label: 'Users & Groups',
            items: [
              '@apostrophecms/user',
              '@apostrophecms-pro/advanced-permission-group'
            ]
          },
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
            label: 'State Agency Content',
            items: [
              'region',
              'policy',
              'job'
            ]
          },
        ]
      }
    }
  };
};
