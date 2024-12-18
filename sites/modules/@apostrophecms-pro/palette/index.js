import path from 'node:path';
import url from 'node:url';
import { glob } from 'glob';

const getConfigs = async (folder) => {
  const dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const files = await glob(path.join(dirname, folder, '**/*.js'));

  const configs = [];
  for (const file of files) {
    const { default: config } = await import(file);
    configs.push(config);
  }

  return configs;
};

const configs = await getConfigs('lib/configs');

export default {
  fields: {
    add: generateFields(configs),
    group: generateGroups(configs)
  }
};

function generateFields(configurations) {
  let fields = {};
  for (const config of Object.keys(configurations)) {
    fields = {
      ...fields,
      ...configurations[config].add
    };
  };

  return fields;
}

function generateGroups(configurations) {
  let groups = {};

  for (const config of Object.keys(configurations)) {
    groups = {
      ...groups,
      ...configurations[config].group
    };
  };

  return groups;
}
