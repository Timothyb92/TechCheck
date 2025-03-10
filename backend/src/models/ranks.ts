import sequelize from '../config/database';

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class Rank extends Model<InferAttributes<Rank>, InferCreationAttributes<Rank>> {
  declare id: number;
  declare name: string;
}

Rank.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Rank',
  }
);

export default Rank;
