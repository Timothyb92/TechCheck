import Character from '../models/characters.model';

const characters = [
  { id: 999, name: 'Any Character' },
  { id: 1, name: 'Ryu' },
  { id: 2, name: 'Luke' },
  { id: 3, name: 'Jamie' },
  { id: 4, name: 'Chun-Li' },
  { id: 5, name: 'Guile' },
  { id: 6, name: 'Kimberly' },
  { id: 7, name: 'Juri' },
  { id: 8, name: 'Ken' },
  { id: 9, name: 'Blanka' },
  { id: 10, name: 'Dhalsim' },
  { id: 11, name: 'E.Honda' },
  { id: 12, name: 'Dee Jay' },
  { id: 13, name: 'Manon' },
  { id: 14, name: 'Marisa' },
  { id: 15, name: 'JP' },
  { id: 16, name: 'Zangief' },
  { id: 17, name: 'Lily' },
  { id: 18, name: 'Cammy' },
  { id: 19, name: 'Rashid' },
  { id: 20, name: 'A.K.I.' },
  { id: 21, name: 'Ed' },
  { id: 22, name: 'Akuma' },
  { id: 23, name: 'M.Bison' },
  { id: 24, name: 'Terry' },
  { id: 25, name: 'Mai' },
  { id: 26, name: 'Elena' },
];

export const seedCharacters = async () => {
  try {
    await Character.bulkCreate(characters, { ignoreDuplicates: true });
  } catch (err) {
    console.error('❌ Error seeding characters table:', err);
  }
};
