import * as migration_20251217_000013 from './20251217_000013';

export const migrations = [
  {
    up: migration_20251217_000013.up,
    down: migration_20251217_000013.down,
    name: '20251217_000013'
  },
];
