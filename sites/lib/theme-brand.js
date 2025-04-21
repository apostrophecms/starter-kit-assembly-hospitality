module.exports = function(site, config) {
  config.modules = {
    ...config.modules,

    // Theme specific assets and helpers
    'theme-brand': {},

    // Theme specific extensions
    '@apostrophecms-pro/advanced-permission': {},
    '@apostrophecms-pro/advanced-permission-group': {},
    // '@apostrophecms-pro/doc-template-library': {},

    // Theme specific pieces
    article: {},
    product: {},
    condition: {},
    resource: {},

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
            label: 'Brand Content',
            items: [
              'article',
              'product',
              'condition',
              'resource',
              '@apostrophecms/form'
            ]
          }
        ]
      }
    }
  };
};
