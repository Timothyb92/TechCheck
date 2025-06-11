import { NODE_ENV } from '../config/env';

import { seedRanks } from './rankSeeder';
import { seedCharacters } from './charactersSeeder';
import { seedUsers } from './userSeeder';
import { seedMatches } from './matchesSeeder';
import { seedUserBlocks } from './userBlocksSeeder';

export const seedTables = async () => {
  try {
    await seedRanks();
    await seedCharacters();
    if (NODE_ENV === 'development') {
      await seedUsers();
      await seedMatches();
      await seedUserBlocks();
    }
  } catch (err) {
    console.error(err);
  }
};
