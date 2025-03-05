import sequelize from '../config/database';

import { DataTypes, UUIDV4 } from 'sequelize';

const MatchRequest = sequelize.define('MatchRequest', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  rankId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('open', 'matched', 'cancelled'),
    defaultValue: 'open',
  },
});

export default MatchRequest;
