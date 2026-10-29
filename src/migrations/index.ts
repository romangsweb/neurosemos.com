import * as migration_20261029_161654_inicial from './20261029_161654_inicial';

export const migrations = [
  {
    up: migration_20261029_161654_inicial.up,
    down: migration_20261029_161654_inicial.down,
    name: '20261029_161654_inicial'
  },
];
