import User from '../models/users';

type Updates = {
  characterId?: number;
  rankId?: number;
  cfnName?: string;
};

import { InferCreationAttributes, InferAttributes } from 'sequelize';

export const getAllUsers = async () => {
  return await User.findAll();
};

export const getOneUser = async (id: number) => {
  return await User.findByPk(id);
};

export const createUser = async (user: InferCreationAttributes<User>) => {
  console.log(user);
  return await User.findOrCreate({
    where: { id: user.id },
    defaults: { ...user },
  });
};

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
};

export const updateUser = async (id: number, updates: Updates) => {
  const user = await getOneUser(id);

  if (!user) {
    throw new Error(`No user found`);
  }

  Object.assign(user as User, updates);
  user.save();
  return user;
};
