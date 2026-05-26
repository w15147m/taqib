// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_powerful_red_skull.sql';
import m0003 from './0003_certain_marauders.sql';
import m0004 from './0004_drop_legacy_tables.sql';

  export default {
    journal,
    migrations: {
      m0000,
      m0003,
      m0004
    }
  }
  