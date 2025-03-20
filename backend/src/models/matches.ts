import sequelize from '../config/database';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class Match extends Model<
  InferAttributes<Match>,
  InferCreationAttributes<Match>
> {
  declare id: number;
  declare playerOneId: number;
  declare characterOneId: number;
  declare status: string;
  declare playerTwoId?: number;
  declare characterTwoId?: number;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    playerOneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    characterOneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'matched', 'cancelled', 'completed'),
      defaultValue: 'open',
    },
    playerTwoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    characterTwoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'Match' }
);

export default Match;
