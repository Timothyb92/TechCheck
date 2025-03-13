import sequelize from '../config/database';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class MatchRequest extends Model<
  InferAttributes<MatchRequest>,
  InferCreationAttributes<MatchRequest>
> {
  declare id: number;
  declare playerOneId: number;
  declare characterOneId: number;
  declare status: string;
  declare playerTwoId: number;
  declare characterTwoId: number;
}

MatchRequest.init(
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
      type: DataTypes.ENUM('open', 'matched', 'cancelled', 'pending'),
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
  { sequelize, modelName: 'MatchRequest' }
);

export default MatchRequest;
