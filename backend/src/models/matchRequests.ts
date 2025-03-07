import sequelize from '../config/database';

import {
  DataTypes,
  UUIDV4,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class MatchRequest extends Model<
  InferAttributes<MatchRequest>,
  InferCreationAttributes<MatchRequest>
> {
  declare id: number;
  declare userId: number;
  declare rankId: number;
  declare status: string;
  declare challengerId: number;
}

MatchRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'matched', 'cancelled', 'pending'),
      defaultValue: 'open',
    },
    challengerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'MatchRequest' }
);

export default MatchRequest;
