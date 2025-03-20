import sequelize from '../config/database';
import Character from './characters';
import MatchRequest from './matches';
import Rank from './ranks';
import User from './users';

const models = {
  Character,
  MatchRequest,
  Rank,
  User,
};

export { sequelize, models };
