export default {
  root: import.meta,
  privateDashboards: true,
  modules: {
    '@apostrophecms/uploadfs': {
      options: {
        uploadfs: {
          disabledFileKey: 'CHANGEME'
        }
      }
    },
    '@apostrophecms-pro/multisite-dashboard': {},
    helper: {},
    site: {},
    'site-page': {},
    asset: {}
  }
};
