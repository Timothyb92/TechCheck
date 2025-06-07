import sequelize from '../config/database';
import Character from './characters.model';
import Match from './matches.model';
import Rank from './ranks.model';
import User from './users.model';
import UserBlock from './userBlocks.model';
import RefreshToken from './refreshTokens';

const models = {
  Character,
  Match,
  Rank,
  User,
  UserBlock,
  RefreshToken,
};

export { sequelize, models };
