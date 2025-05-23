export default async function (site) {
  const config = {
    root: import.meta,
    // Theme name is globally available as apos.options.theme
    theme: site.theme,
    nestedModuleSubdirs: true,
    modules: {
      // Apostrophe module configuration
      // *******************************
      //
      // NOTE: most configuration occurs in the respective modules' directories.
      // See modules/@apostrophecms/page/index.js for an example.
      //
      // Any modules that are not present by default in Apostrophe must at least
      // have a minimal configuration here to turn them on: `moduleName: {}`
      // ***********************************************************************
      // `className` options set custom CSS classes for Apostrophe core widgets.
      '@apostrophecms/rich-text-widget': {
        options: {}
      },
      '@apostrophecms/image-widget': {
        options: {
          className: 'img-fluid'
        }
      },
      '@apostrophecms/video-widget': {
        options: {}
      },

      // The main form module
      '@apostrophecms/form': {
        options: {
          shortcut: 'a,f'
        }
      },
      // The form widget module, allowing editors to add forms to content areas
      '@apostrophecms/form-widget': {},
      // Form field widgets, used by the main form module to build forms.
      '@apostrophecms/form-text-field-widget': {},
      '@apostrophecms/form-textarea-field-widget': {},
      '@apostrophecms/form-select-field-widget': {},
      '@apostrophecms/form-radio-field-widget': {},
      '@apostrophecms/form-file-field-widget': {},
      '@apostrophecms/form-checkboxes-field-widget': {},
      '@apostrophecms/form-boolean-field-widget': {},
      '@apostrophecms/form-conditional-widget': {},

      '@apostrophecms/sitemap': {
        options: {
          excludeTypes: [ 'team-member', 'product' ]
        }
      },
      '@apostrophecms/seo': {},
      '@apostrophecms/open-graph': {},

      // `asset` supports the project's webpack build for client-side assets.
      helper: {},
      asset: {},

      // The project's first custom page type.
      'default-page': {},
      'content-widget-modules': {
        options: {
          ignoreNoCodeWarning: true
        }
      },
      'pieces-modules': {
        options: {
          ignoreNoCodeWarning: true
        }
      },
      '@apostrophecms/uploadfs': {
        options: {
          uploadfs: {
            // Be sure to change
            disabledFileKey: 'CHANGEME'
          }
        }
      },
      '@apostrophecms/express': {
        options: {
          session: {
            secret: 'CHANGEME'
          },
          apiKeys: {
            [process.env.AS_SITES_API_KEY]: {
              role: 'admin'
            }
          }
        }
      },
      // Just a nice place to keep our helper functions and macros that are
      // used across all sites

      // The @apostrophecms/home-page module always exists, no need to activate it here
      '@apostrophecms-pro/palette': {},
      '@apostrophecms-pro/document-versions': {},
      // Use Vite bundler
    '@apostrophecms/vite': {},
      websocket: {}
    }
  };
  // Allow each theme to modify the configuration object,
  // enabling additional modules etc.
  const { default: theme } = await import(`./lib/theme-${site.theme}.js`);
  theme(site, config);

  return config;
};
