import sequelize from '../config/database';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

class UserBlock extends Model {
  declare id: number;
  declare blockerId: number;
  declare blockedId: number;
}

UserBlock.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    blockerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    blockedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'UserBlock' }
);

export default UserBlock;
