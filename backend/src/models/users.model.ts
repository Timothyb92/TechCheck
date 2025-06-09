import sequelize from '../config/database';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare passwordHash: string;
  declare rankId: number | null;
  declare mainCharacterId: number | null;
  declare avatar: string;
  declare global_name?: string;
  declare locale: string;
  declare cfnName: CreationOptional<string> | null;
  declare deleted: boolean;
  declare canApplyJoin: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rankId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    mainCharacterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    global_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cfnName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canApplyJoin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { sequelize, modelName: 'User' }
);

export default User;
