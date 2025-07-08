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
  declare status: string;
  declare playerTwoId?: number;
  declare characterTwoId: number;
  declare applicantCharId?: number;
  declare minRankId: number;
  declare maxRankId: number;
  declare passcode?: string;
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
    status: {
      type: DataTypes.ENUM(
        'open',
        'pending',
        'matched',
        'cancelled',
        'completed'
      ),
      defaultValue: 'open',
    },
    playerTwoId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    characterTwoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    applicantCharId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    maxRankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minRankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    passcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Match',
    defaultScope: {},
  }
);

export default Match;
