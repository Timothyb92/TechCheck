import User from '../models/users';

const Users = [
  {
    id: 1,
    username: 'TzMFk',
    email: 'tzk@tzk.com',
    passwordHash: 'asdf',
    rankId: 40,
    mainCharacterId: 23,
    global_name: 'Tim',
    locale: 'en-us',
    avatar: 'abc123',
  },
  {
    id: 2,
    username: 'ninjoh',
    email: 'ninjoh@ninjoh.com',
    passwordHash: 'asdf',
    rankId: 41,
    mainCharacterId: 21,
    global_name: 'Joey',
    locale: 'en-us',
    avatar: '123abc',
  },
];

export const seedUsers = async () => {
  try {
    await User.bulkCreate(Users, { ignoreDuplicates: true });
  } catch (err) {
    console.error(err);
  }
};
