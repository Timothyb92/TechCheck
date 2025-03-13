import User from '../models/users';

const Users = [
  {
    id: 1,
    username: 'Tzk',
    email: 'tzk@tzk.com',
    passwordHash: 'asdf',
    rankId: 40,
    mainCharacterId: 23,
  },
  {
    id: 2,
    username: 'ninjoh',
    email: 'ninjoh@ninjoh.com',
    passwordHash: 'asdf',
    rankId: 41,
    mainCharacterId: 21,
  },
];

export const seedUsers = async () => {
  try {
    await User.bulkCreate(Users, { ignoreDuplicates: true });
    console.log('✅ Users table seeded successfully');
  } catch (err) {
    console.error(err);
  }
};
