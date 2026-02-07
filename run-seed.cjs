const path = require('path');
require('reflect-metadata');
require('ts-node').register({
  project: 'apps/api-main/tsconfig.json',
  transpileOnly: true,
});
require('tsconfig-paths/register');
require(path.resolve(__dirname, 'apps/api-main/src/run-seed.ts'));
