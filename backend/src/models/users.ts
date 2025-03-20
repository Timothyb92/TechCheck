import sequelize from '../config/database';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare passwordHash: string;
  declare rankId: number;
  declare mainCharacterId: number;
  declare avatar: string;
  declare global_name: string;
  declare locale: string;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      // autoIncrement: true,
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
    },
    mainCharacterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    global_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'User' }
);

export default User;
