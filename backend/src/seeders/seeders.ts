import { seedRanks } from './rankSeeder';
import { seedCharacters } from './charactersSeeder';
import { seedUsers } from './userSeeder';
import { seedMatches } from './matchesSeeder';
import { seedUserBlocks } from './userBlocksSeeder';

export const seedTables = async () => {
  try {
    await seedRanks();
    await seedCharacters();
    await seedUsers();
    await seedMatches();
    await seedUserBlocks();
    // console.info('✅ Tables seeded successfully');
  } catch (err) {
    console.error(err);
  }
};
