import Rank from '../models/ranks.model';

const Ranks = [
  { id: 1, name: 'Rookie 1' },
  { id: 2, name: 'Rookie 2' },
  { id: 3, name: 'Rookie 3' },
  { id: 4, name: 'Rookie 4' },
  { id: 5, name: 'Rookie 5' },
  { id: 6, name: 'Iron 1' },
  { id: 7, name: 'Iron 2' },
  { id: 8, name: 'Iron 3' },
  { id: 9, name: 'Iron 4' },
  { id: 10, name: 'Iron 5' },
  { id: 11, name: 'Bronze 1' },
  { id: 12, name: 'Bronze 2' },
  { id: 13, name: 'Bronze 3' },
  { id: 14, name: 'Bronze 4' },
  { id: 15, name: 'Bronze 5' },
  { id: 16, name: 'Silver 1' },
  { id: 17, name: 'Silver 2' },
  { id: 18, name: 'Silver 3' },
  { id: 19, name: 'Silver 4' },
  { id: 20, name: 'Silver 5' },
  { id: 21, name: 'Gold 1' },
  { id: 22, name: 'Gold 2' },
  { id: 23, name: 'Gold 3' },
  { id: 24, name: 'Gold 4' },
  { id: 25, name: 'Gold 5' },
  { id: 26, name: 'Platinum 1' },
  { id: 27, name: 'Platinum 2' },
  { id: 28, name: 'Platinum 3' },
  { id: 29, name: 'Platinum 4' },
  { id: 30, name: 'Platinum 5' },
  { id: 31, name: 'Diamond 1' },
  { id: 32, name: 'Diamond 2' },
  { id: 33, name: 'Diamond 3' },
  { id: 34, name: 'Diamond 4' },
  { id: 35, name: 'Diamond 5' },
  { id: 36, name: 'Master' },
  { id: 37, name: 'High Master' },
  { id: 38, name: 'Grand Master' },
  { id: 39, name: 'Ultimate Master' },
  { id: 40, name: 'Legend' },
  { id: 999, name: 'Any Rank' },
];

export const seedRanks = async () => {
  try {
    await Rank.bulkCreate(Ranks, { ignoreDuplicates: true });
  } catch (err) {
    console.error('❌ Error seeding ranks table:', err);
  }
};
