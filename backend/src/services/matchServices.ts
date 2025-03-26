import Match from '../models/matches.model';

import { InferCreationAttributes, InferAttributes, Op, or } from 'sequelize';

type Updates = {
  playerTwoId: number;
  characterTwoId: number;
  status: string;
};

export const getAllMatches = async () => {
  return await Match.findAll();
};

export const getOneMatch = async (matchId: number) => {
  return await Match.findByPk(matchId);
};

export const createMatch = async (match: InferCreationAttributes<Match>) => {
  return await Match.create(match);
};

export const updateMatch = async (matchId: number, updates: Updates) => {
  try {
    const match = await getOneMatch(matchId);

    if (!match) {
      throw new Error(`No match found`);
    }

    Object.assign(match, updates);
    match.save();
    return match;
  } catch (err) {
    console.error(err);
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
