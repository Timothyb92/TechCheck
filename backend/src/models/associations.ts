import { models } from './index';
const { User, Match, Rank, Character, UserBlock, RefreshToken } = models;

Match.belongsTo(User, { foreignKey: 'playerOneId', as: 'playerOne' });
Match.belongsTo(User, { foreignKey: 'playerTwoId', as: 'playerTwo' });
Match.belongsTo(Character, {
  foreignKey: 'characterTwoId',
  as: 'characterTwo',
});
Match.belongsTo(Rank, { foreignKey: 'minRankId', as: 'minRank' });
Match.belongsTo(Rank, { foreignKey: 'maxRankId', as: 'maxRank' });

RefreshToken.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.hasMany(Match, { foreignKey: 'playerOneId', as: 'matchesCreated' });
User.hasMany(Match, { foreignKey: 'playerTwoId', as: 'matchesJoined' });
User.belongsTo(Rank, { foreignKey: 'rankId' });
User.belongsTo(Character, { foreignKey: 'mainCharacterId' });
User.hasMany(UserBlock, { foreignKey: 'blockerId', as: 'blocksMade' });
User.hasMany(UserBlock, { foreignKey: 'blockedId', as: 'blocksReceived' });
User.hasMany(RefreshToken, { foreignKey: 'userId' });

Character.hasMany(User, { foreignKey: 'mainCharacterId' });
Character.hasMany(Match, {
  foreignKey: 'characterTwoId',
  as: 'characterTwo',
});

Rank.hasMany(User, { foreignKey: 'rankId' });
Rank.hasMany(Match, {
  foreignKey: 'minRankId',
  as: 'minRank',
});
Rank.hasMany(Match, {
  foreignKey: 'maxRankId',
  as: 'maxRank',
});

UserBlock.belongsTo(User, { foreignKey: 'blockerId', as: 'blocker' });
UserBlock.belongsTo(User, { foreignKey: 'blockedId', as: 'blocked' });

export const setupAssociations = () => {
  try {
    return null;
  } catch (err) {
    console.error(err);
  }
};
