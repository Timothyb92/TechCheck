import User from './users';
import MatchRequest from './matches';
import Rank from './ranks';
import Character from './characters';

MatchRequest.belongsTo(User, { foreignKey: 'playerOneId', as: 'player1' });
MatchRequest.belongsTo(User, { foreignKey: 'playerTwoId', as: 'player2' });
MatchRequest.belongsTo(Character, {
  foreignKey: 'characterOneId',
  as: 'characterOne',
});
MatchRequest.belongsTo(Character, {
  foreignKey: 'characterTwoId',
  as: 'characterTwo',
});

User.hasMany(MatchRequest, { foreignKey: 'playerOneId', as: 'matchesCreated' });
User.hasMany(MatchRequest, { foreignKey: 'playerTwoId', as: 'matchesJoined' });
User.belongsTo(Rank, { foreignKey: 'rankId' });
User.belongsTo(Character, { foreignKey: 'mainCharacterId' });

Character.hasMany(User, { foreignKey: 'mainCharacterId' });
Character.hasMany(MatchRequest, {
  foreignKey: 'characterOneId',
  as: 'characterOne',
});
Character.hasMany(MatchRequest, {
  foreignKey: 'characterTwoId',
  as: 'characterTwo',
});

Rank.hasMany(User, { foreignKey: 'rankId' });

export const setupAssociations = () => {
  return null;
};
