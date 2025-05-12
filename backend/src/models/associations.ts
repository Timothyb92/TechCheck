import { models } from './index';
const { User, Match, Rank, Character, UserBlock } = models;

Match.belongsTo(User, { foreignKey: 'playerOneId', as: 'player1' });
Match.belongsTo(User, { foreignKey: 'playerTwoId', as: 'player2' });
Match.belongsTo(Character, {
  foreignKey: 'characterOneId',
  as: 'characterOne',
});
Match.belongsTo(Character, {
  foreignKey: 'characterTwoId',
  as: 'characterTwo',
});

User.hasMany(Match, { foreignKey: 'playerOneId', as: 'matchesCreated' });
User.hasMany(Match, { foreignKey: 'playerTwoId', as: 'matchesJoined' });
User.belongsTo(Rank, { foreignKey: 'rankId' });
User.belongsTo(Character, { foreignKey: 'mainCharacterId' });
User.hasMany(UserBlock, { foreignKey: 'blockerId', as: 'blocksMade' });
User.hasMany(UserBlock, { foreignKey: 'blockedId', as: 'blocksReceived' });

Character.hasMany(User, { foreignKey: 'mainCharacterId' });
Character.hasMany(Match, {
  foreignKey: 'characterOneId',
  as: 'characterOne',
});
Character.hasMany(Match, {
  foreignKey: 'characterTwoId',
  as: 'characterTwo',
});

Rank.hasMany(User, { foreignKey: 'rankId' });

UserBlock.belongsTo(User, { foreignKey: 'blockerId', as: 'blocker' });
UserBlock.belongsTo(User, { foreignKey: 'blockedId', as: 'blocked' });

export const setupAssociations = () => {
  try {
    return null;
  } catch (err) {
    console.error(err);
  }
};
