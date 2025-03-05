import sequelize from '../config/database';

import { DataTypes } from 'sequelize';

const Rank = sequelize.define('Rank', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Rank;
