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
  declare playerOneCfn?: string;
  declare characterOneId: number;
  declare status: string;
  declare playerTwoId?: number;
  declare playerTwoCfn?: string;
  declare characterTwoId: number;
  declare applicantCharId?: number;
  declare creatorSocketId?: string;
  declare locale: string;
  declare customRoomId: string;
  declare minRankId: number;
  declare maxRankId: number;
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
    playerOneCfn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    characterOneId: {
      type: DataTypes.INTEGER,
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
    playerTwoCfn: {
      type: DataTypes.STRING,
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
    creatorSocketId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customRoomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxRankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minRankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Match' }
);

export default Match;
