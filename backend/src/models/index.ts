import sequelize from '../config/database';
import Character from './characters.model';
import Match from './matches.model';
import Rank from './ranks.model';
import User from './users.model';
import UserBlock from './userBlocks.model';

const models = {
  Character,
  Match,
  Rank,
  User,
  UserBlock,
};

export { sequelize, models };
