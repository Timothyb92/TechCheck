import UserBlock from '../models/userBlocks.model';

const UserBlocks = [
  {
    id: 1,
    blockerId: 1,
    blockedId: 2,
  },
];

export const seedUserBlocks = async () => {
  try {
    await UserBlock.bulkCreate(UserBlocks);
  } catch (err) {
    console.error(err);
  }
};
