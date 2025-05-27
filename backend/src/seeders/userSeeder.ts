import User from '../models/users.model';

const Users = [
  {
    id: 1,
    username: 'TzMFk',
    email: 'tzk@tzk.com',
    passwordHash: 'asdf',
    rankId: 40,
    mainCharacterId: 23,
    global_name: 'Tim',
    cfnName: 'TzMFk',
    locale: 'en-us',
    avatar: 'abc123',
    deleted: false,
    canApplyJoin: true,
  },
  {
    id: 2,
    username: 'ninjoh',
    email: 'ninjoh@ninjoh.com',
    passwordHash: 'asdf',
    rankId: 41,
    mainCharacterId: 21,
    global_name: 'Joey',
    cfnName: 'Ninjoh',
    locale: 'en-us',
    avatar: '123abc',
    deleted: false,
    canApplyJoin: false,
  },
  {
    id: 479454123339808830,
    username: 'tim018978',
    email: 'test@gmail.com',
    passwordHash: 'asdf',
    rankId: 41,
    mainCharacterId: 1,
    global_name: '//Tim',
    cfnName: 'TzMFk',
    locale: 'en-US',
    avatar: 'b9a23cd954d1abf0ce826a3d7164c921',
    deleted: false,
    canApplyJoin: true,
  },
  {
    id: 219525739341545470,
    username: 'tzmfk',
    email: 'test@hotmail.com',
    passwordHash: 'asdf',
    rankId: 40,
    mainCharacterId: 20,
    global_name: 'Tzk',
    cfnName: 'Tzk',
    locale: 'en-US',
    avatar: 'bf721f702c0b14a49be54b64d6f4d8f6',
    deleted: false,
    canApplyJoin: true,
  },
];

export const seedUsers = async () => {
  try {
    await User.bulkCreate(Users, { ignoreDuplicates: true });
  } catch (err) {
    console.error(err);
  }
};
