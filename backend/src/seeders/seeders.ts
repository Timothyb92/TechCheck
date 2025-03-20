import { seedRanks } from './rankSeeder';
import { seedCharacters } from './charactersSeeder';
import { seedUsers } from './userSeeder';
import { seedMatches } from './matchesSeeder';

export const seedTables = async () => {
  try {
    await seedRanks();
    await seedCharacters();
    await seedUsers();
    await seedMatches();
  } catch (err) {
    console.error(err);
  }
};
