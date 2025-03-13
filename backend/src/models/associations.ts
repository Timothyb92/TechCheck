import User from './users';
import MatchRequest from './matchRequests';
import Rank from './ranks';
import Character from './characters';

MatchRequest.belongsTo(User, { foreignKey: 'player1Id', as: 'player1' });
MatchRequest.belongsTo(User, { foreignKey: 'player2Id', as: 'player2' });

User.hasMany(MatchRequest, { foreignKey: 'player1Id', as: 'matchesCreated' });
User.hasMany(MatchRequest, { foreignKey: 'player2Id', as: 'matchesJoined' });
User.belongsTo(Rank);
User.belongsTo(Character);

Character.hasMany(User);

Rank.hasMany(User);

export const setupAssociations = () => {
  console.log('Table associations set');
};
