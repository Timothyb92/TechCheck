import Match from '../models/matches.model';

import { InferCreationAttributes, InferAttributes, Op, or } from 'sequelize';

type Updates = {
  playerTwoId?: number;
  characterTwoId?: number;
  status?: string;
};

const validateCrateMatch = async (userId: number) => {
  let canCreateMatch: boolean;
  const openMatches = await Match.findAll({
    where: {
      playerOneId: userId,
      status: {
        [Op.notIn]: ['cancelled', 'completed'],
      },
    },
  });
  canCreateMatch = openMatches.length > 0 ? false : true;
  return canCreateMatch;
};

export const getAllMatches = async () => {
  return await Match.findAll();
};

export const getOneMatch = async (matchId: number) => {
  return await Match.findByPk(matchId);
};

export const createMatch = async (match: InferCreationAttributes<Match>) => {
  if (await validateCrateMatch(match.playerOneId)) {
    return await Match.create(match);
  } else {
    throw new Error('User already has open match');
  }
};

export const updateMatch = async (matchId: number, updates: Updates) => {
  try {
    const match = await getOneMatch(matchId);

    if (!match) {
      throw new Error(`No match found`);
    }

    if (updates.status === 'pending' && match.status !== 'open') {
      throw new Error(`Can't apply to match that isn't open`);
    }

    Object.assign(match, updates);
    await match.save();
    return match;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllMatchesCreatedByUser = async (userId: number) => {
  try {
    const matchesCreated = await Match.findAll({
      where: { playerOneId: userId },
    });
    return matchesCreated;
  } catch (err) {
    console.error(err);
  }
};

export const getAllMatchesJoinedByUser = async (userId: number) => {
  try {
    const matchesCreated = await Match.findAll({
      where: { playerTwoId: userId },
    });
    return matchesCreated;
  } catch (err) {
    console.error(err);
  }
};

export const getAllMatchesByUser = async (userId: number) => {
  try {
    const matches = await Match.findAll({
      where: {
        [Op.or]: [{ playerOneId: userId }, { playerTwoId: userId }],
      },
    });
    return matches;
  } catch (err) {
    console.error(err);
  }
};
