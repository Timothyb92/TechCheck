import User from '../models/users.model';
import Rank from '../models/ranks.model';
import Match from '../models/matches.model';
import Character from '../models/characters.model';

type Updates = {
  characterId?: number;
  rankId?: number;
  cfnName?: string;
  canApplyJoin?: boolean;
  applicantCharId?: number | null;
};

import { InferCreationAttributes, InferAttributes } from 'sequelize';

export const getAllUsers = async () => {
  return await User.findAll({
    include: [
      {
        model: Rank,
        attributes: ['name', 'id'],
      },
      {
        model: Character,
        attributes: ['name', 'id'],
      },
    ],
  });
};

export const getOneUser = async (id: number) => {
  return await User.findByPk(id, {
    include: [
      {
        model: Rank,
        attributes: ['name'],
      },
      {
        model: Character,
        attributes: ['name'],
      },
    ],
  });
};

export const createUser = async (user: InferCreationAttributes<User>) => {
  const {
    id,
    username,
    email,
    passwordHash,
    rankId,
    mainCharacterId,
    avatar,
    global_name,
    locale,
    cfnName,
    deleted,
    canApplyJoin,
  } = user;
  return await User.findOrCreate({
    where: { id: user.id },
    defaults: {
      id,
      username,
      email,
      passwordHash,
      rankId,
      mainCharacterId,
      avatar,
      global_name,
      locale,
      cfnName,
      deleted,
      canApplyJoin,
    },
  });
};

// export const createUser = async (user: InferCreationAttributes<User>) => {
//   return await User.findCreateFind({
//     where: { id: user.id },
//     defaults: { ...user },
//   });
// };

export const updateUser = async (id: number, updates: Updates) => {
  const user = await getOneUser(id);

  if (!user) {
    throw new Error(`No user found`);
  }

  Object.assign(user as User, updates);
  await user.save();
  return user;
};
