import sequelize from '../config/database';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

class Match extends Model<
  InferAttributes<Match>,
  InferCreationAttributes<Match>
> {
  declare id: CreationOptional<number>;
  declare playerOneId: number;
  declare characterOneId: number;
  declare status: string;
  declare playerTwoId?: number;
  declare characterTwoId?: number;
}

Match.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    playerOneId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    characterOneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'open',
        'matched',
        'cancelled',
        'completed',
        'pending'
      ),
      defaultValue: 'open',
    },
    playerTwoId: {
      type: DataTypes.BIGINT,
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
