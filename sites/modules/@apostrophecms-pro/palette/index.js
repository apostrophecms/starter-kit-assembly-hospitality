import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import configs directly instead of using require-all
import base from './lib/configs/1base.js';
import type from './lib/configs/2type.js';
import buttons from './lib/configs/3buttons.js';
import header from './lib/configs/4header.js';
import footer from './lib/configs/5footer.js';

const configs = {
  base,
  type,
  buttons,
  header,
  footer
};

export default {
  fields: {
    add: generateFields(configs),
    group: generateGroups(configs)
  }
};

function generateFields (configs) {
  let fields = {};
  for (const config of Object.keys(configs)) {
    fields = {
      ...fields,
      ...configs[config].add
    };
  };

  return fields;
}

function generateGroups (configs) {
  let groups = {};

  for (const config of Object.keys(configs)) {
    groups = {
      ...groups,
      ...configs[config].group
    };
  };

  return groups;
}