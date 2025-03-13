import MatchRequest from '../models/matchRequests';

import { InferCreationAttributes, InferAttributes } from 'sequelize';

export const getAllMatchRequests = async () => {
  return await MatchRequest.findAll();
};

export const getOneMatchRequest = async (id: number) => {
  return await MatchRequest.findByPk(id);
};

export const createMatchRequest = async (
  match: InferCreationAttributes<MatchRequest>
) => {
  return await MatchRequest.create(match);
};

export const cancelMatchRequest = async (matchId: number) => {
  try {
    const matchToUpdate = await getOneMatchRequest(matchId);

    if (!matchToUpdate) {
      throw new Error(`Match with ID of ${matchId} not found.`);
    }

    matchToUpdate.status = 'cancelled';
    matchToUpdate.save();
  } catch (err) {
    console.error(err);
  }
};
