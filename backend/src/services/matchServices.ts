import Match from '../models/matches.model';

import { InferCreationAttributes, InferAttributes, Op, or } from 'sequelize';

export const getAllMatches = async () => {
  return await Match.findAll();
};

export const getOneMatch = async (id: number) => {
  return await Match.findByPk(id);
};

export const createMatch = async (match: InferCreationAttributes<Match>) => {
  return await Match.create(match);
};

export const cancelMatch = async (matchId: number) => {
  try {
    const matchToUpdate = await getOneMatch(matchId);

    if (!matchToUpdate) {
      throw new Error(`Match with ID of ${matchId} not found.`);
    }

    matchToUpdate.status = 'cancelled';
    matchToUpdate.save();
    return matchToUpdate;
  } catch (err) {
    console.error(err);
  }
};

export const getAllMatchesCreatedByUser = async (id: number) => {
  try {
    const matchesCreated = await Match.findAll({
      where: { playerOneId: id },
    });
    return matchesCreated;
  } catch (err) {
    console.error(err);
  }
};

export const getAllMatchesJoinedByUser = async (id: number) => {
  try {
    const matchesCreated = await Match.findAll({
      where: { playerTwoId: id },
    });
    return matchesCreated;
  } catch (err) {
    console.error(err);
  }
};

export const getAllMatchesByUser = async (id: number) => {
  try {
    const matches = await Match.findAll({
      where: {
        [Op.or]: [{ playerOneId: id }, { playerTwoId: id }],
      },
    });
    return matches;
  } catch (err) {
    console.error(err);
  }
};
