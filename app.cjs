const multisite = require('@apostrophecms-pro/multisite');

async function go() {
  try {
    await multisite({
      port: 3000,
      websocket: true,
      shortNamePrefix: process.env.APOS_PREFIX || 'demo-local-',
      localeSeparator: '.',
      dashboardShortName: process.env.APOS_DASHBOARD_SHORTNAME || 'dashboard',
      mongodbUrl: 'mongodb://localhost:27017',
      sessionSecret: 'CHANGEME',
      sites: (await import('./sites/index.js')).default,
      dashboard: (await import('./dashboard/index.js')).default
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

go();