import UserBlock from '../models/userBlocks.model';

import { InferCreationAttributes, InferAttributes, Op, or } from 'sequelize';

export const getAllUserBlocks = async () => {
  try {
    return await UserBlock.findAll();
  } catch (err) {
    console.error(err);
  }
};

export const blockUser = async (block: InferCreationAttributes<UserBlock>) => {
  try {
    return await UserBlock.create(block);
  } catch (err) {
    console.error(err);
  }
};

export const unblockUser = async (
  block: InferCreationAttributes<UserBlock>
) => {
  try {
    return await UserBlock.destroy({
      where: {
        id: block.id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
