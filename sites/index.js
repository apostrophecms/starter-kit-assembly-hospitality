module.exports = function (site) {
  const config = {
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

      // Configuration of core ApostropheCMS widgets
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

      // Configuration for the Apostrophe Form extension
      // https://apostrophecms.com/extensions/form-builder-2
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

      // Configuration for the Apostrophe Sitemap extension
      // https://apostrophecms.com/extensions/site-maps
      '@apostrophecms/sitemap': {
        options: {
          excludeTypes: [ 'team-member', 'product' ]
        }
      },

      // Enabling the SEO and Open Graph extensions
      // These don't require any configuration for our needs in this project
      // https://apostrophecms.com/extensions/seo-tools-3
      '@apostrophecms/seo': {},
      // https://github.com/apostrophecms/open-graph
      '@apostrophecms/open-graph': {},

      // Configuration of core security settings - make sure to change these
      '@apostrophecms/uploadfs': {
        options: {
          uploadfs: {
          // Should be changed to be a unique key
          disabledFileKey: 'CHANGEME'
          }
        }
      },
      '@apostrophecms/express': {
        options: {
          session: {
          // Should be changed to be a unique key
          secret: 'CHANGEME'
          }
        }
      },

      // Enabling the Palette and Document Versions extensions
      // These don't require any configuration for our needs in this project
      // https://apostrophecms.com/extensions/palette-3
      '@apostrophecms-pro/palette': {},
      // https://apostrophecms.com/extensions/document-version
      '@apostrophecms-pro/document-versions': {},

      // Configuration of the core i18n module for multi-language support
      // https://docs.apostrophecms.org/reference/modules/i18n.html
      '@apostrophecms/i18n': {
        options: {
          defaultAdminLocale: 'en',
          adminLocales: [
            {
              label: 'English',
              value: 'en'
            },
          ]
        }
      },

      // Configuration of AI-powered extensions (Automatic Translation and SEO Assistant)
      // These require API keys to be set as environment variables
      // https://apostrophecms.com/extensions/automatic-translation
      '@apostrophecms-pro/automatic-translation': {
        options: {
          provider: 'azure'
        }
      },
      '@apostrophecms-pro/automatic-translation-azure': {},
      // https://apostrophecms.com/extensions/seo-assistant
      '@apostrophecms-pro/seo-assistant': {
        options: {
          provider: 'openai'
        }
      },
      '@apostrophecms-pro/seo-assistant-openai': {},

      // Project level modules unique to this demo app
      // ********************************************************
      // `helper` is a module where we can add various re-usable functions
      helper: {},
      // `asset` supports the project's webpack build for client-side assets.
      asset: {},
      settings: {},
      // Configuration for the behavior of the `default` page type
      'default-page': {},
      // Additional Widget modules contained in the `content-widget-modules` directory
      'content-widget-modules': {
        options: {
          ignoreNoCodeWarning: true
        }
      },
      // Additional Piece modules contained in the `content-widget-modules` directory
      'pieces-modules': {
        options: {
          ignoreNoCodeWarning: true
        }
      },
      // Example of project level implementation of core websocket support
      websocket: {}
    }
  };

  // Iterates over additional configuration for each individual theme
  // and applies that to the global site configuration
  require(`./lib/theme-${site.theme}.js`)(site, config);
  return config;
};
