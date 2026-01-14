import * as migration_20260114_110610 from './20260114_110610';

export const migrations = [
  {
    up: migration_20260114_110610.up,
    down: migration_20260114_110610.down,
    name: '20260114_110610'
  },
];
