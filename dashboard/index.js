export default {
  modules: {
    '@apostrophecms/uploadfs': {
      options: {
        uploadfs: {
          disabledFileKey: 'CHANGEME'
        }
      }
    },
    helper: {},
    '@apostrophecms-pro/multisite-dashboard': {},
    site: {
      options: {
        baseUrlDomains: {
          local: 'localhost:3000',
          // Should be a real registered domain or subdomain with a DNS wildcard pointing to the cloud
          staging: 'staging.hospitality.apos.dev',
          // Should be a real registered domain or subdomain with a DNS wildcard pointing to the cloud
          prod: 'hospitality.apos.dev'
        }
      }
    },
    'site-page': {},
    asset: {},
    '@apostrophecms/vite': {},
    '@apostrophecms/asset': {
      options: {
        hmr: 'public',  // Default - enables HMR for project UI
      }
    }
  },
  privateDashboards: true
};