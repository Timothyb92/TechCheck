import Character from '../models/characters';

const characters = [
  { id: 1, name: 'Ryu' },
  { id: 2, name: 'Luke' },
  { id: 3, name: 'Ken' },
  { id: 4, name: 'Jamie' },
  { id: 5, name: 'Chun-Li' },
  { id: 6, name: 'Guile' },
  { id: 7, name: 'Kimberly' },
  { id: 8, name: 'Juri' },
  { id: 9, name: 'Blanka' },
  { id: 10, name: 'Dhalsim' },
  { id: 11, name: 'E.Honda' },
  { id: 12, name: 'Dee Jay' },
  { id: 13, name: 'Manon' },
  { id: 14, name: 'Marisa' },
  { id: 15, name: 'JP' },
  { id: 16, name: 'Zangief' },
  { id: 17, name: 'Liily' },
  { id: 18, name: 'Cammy' },
  { id: 19, name: 'Rashid' },
  { id: 20, name: 'A.K.I.' },
  { id: 21, name: 'Ed' },
  { id: 22, name: 'Akuma' },
  { id: 23, name: 'M.Bison' },
  { id: 24, name: 'Terry' },
  { id: 25, name: 'Mai' },
];

export const seedCharacters = async () => {
  try {
    await Character.bulkCreate(characters, { ignoreDuplicates: true });
    console.log('✅ Characters table seeded successfully');
  } catch (err) {
    console.error('❌ Error seeding characters table:', err);
  }
};
