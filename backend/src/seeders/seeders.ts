import { seedRanks } from './rankSeeder';
import { seedCharacters } from './charactersSeeder';
import { seedUsers } from './userSeeder';
import { seedMatchRequests } from './matchRequestsSeeder';

export const seedTables = async () => {
  try {
    await seedRanks();
    await seedCharacters();
    await seedUsers();
    await seedMatchRequests();
  } catch (err) {
    console.error(err);
  }
};
