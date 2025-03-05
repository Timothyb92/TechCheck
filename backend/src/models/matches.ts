import { UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

import { DataTypes } from 'sequelize';

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  playerOneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  playerTwoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  characterOneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  characterTwoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
});

export default Match;
