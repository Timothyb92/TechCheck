import User from '../models/users';

import { InferCreationAttributes, InferAttributes } from 'sequelize';

export const getAllUsers = async () => {
  return await User.findAll();
};

export const getOneUser = async (id: number) => {
  console.log('Get one service running');
  return await User.findByPk(id);
};

export const createUser = async (user: InferCreationAttributes<User>) => {
  return await User.create(user);
};

export const deleteUser = async (id: number) => {
  console.log('Delete one service running');
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
};
