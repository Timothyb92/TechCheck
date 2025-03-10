import { seedRanks } from './rankSeeders';
import { seedCharacters } from './charactersSeeder';

export const seedTables = async () => {
  try {
    await seedRanks();
    await seedCharacters();
  } catch (err) {
    console.error(err);
  }
};
