import { api } from "@opentelemetry/sdk-node";

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
    asset: {},
    // Use Vite bundler
    '@apostrophecms/vite': {},
    '@apostrophecms/express': {
      options: {
        apiKeys: {
          [process.env.AS_DASHBOARD_API_KEY]: {
            role: 'admin'
          }
        }
      }
    }
  }
};
