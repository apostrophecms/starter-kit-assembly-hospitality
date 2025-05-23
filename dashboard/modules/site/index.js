import fs from 'fs';
import fetch from 'node-fetch';

import themes from '../../../themes.js';
import baseUrlDomains from '../../../domains.js';

export default {
  options: {
    baseUrlDomains,
    localizedSites: true
  },
  tasks(self, options) {
    return {
      'list-themes': {
        usage: 'List the theme shortnames. Used by the cloud asset generation system.',
        async task(argv) {
          console.log(themes.map(theme => theme.value).join('\n'));
        }
      }
    };
  },
  handlers(self, options) {
    return {
      afterSave: {
        async ensureCertificate(req, piece, options) {
          // Use the platform balancer API to immediately get a certificate for
          // the new site, so it can be accessed right away after creation.
          //
          // Sites created on a worker will be temporary and the worker won't
          // have the PB API key, so just make sure we have it first.

          if ((self.apos.options.multisite.activeEnv !== self.apos.options.multisite.debugEnv) && self.apos.baseUrl && fs.existsSync('/opt/cloud/platform-balancer-api-key')) {
            const key = fs.readFileSync('/opt/cloud/platform-balancer-api-key', 'utf8').trim();
            if (key.length) {
              const refreshUrl = self.apos.baseUrl + '/platform-balancer/refresh';
              const response = await fetch(refreshUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  // Since this key is visible to the Apostrophe application code in production,
                  // it is only capable of one thing: asking nicely that certificates be
                  // generated, if it's time and they are needed, for sites
                  // that are already in the system. Thus not a security risk
                  key
                })
              });
              if (response.status !== 200) {
                throw await response.text();
              }
            }
          }
        }
      }
    };
  }
};
