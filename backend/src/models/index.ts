import sequelize from '../config/database';
import Character from './characters';
import Match from './matches';
import MatchRequest from './matchRequests';
import Rank from './ranks';
import User from './users';

const models = {
  Character,
  MatchRequest,
  Rank,
  User,
  Match,
};

export { sequelize, models };
