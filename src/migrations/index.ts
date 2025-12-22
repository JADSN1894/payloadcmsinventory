import * as migration_20251222_123406 from './20251222_123406';

export const migrations = [
  {
    up: migration_20251222_123406.up,
    down: migration_20251222_123406.down,
    name: '20251222_123406'
  },
];
