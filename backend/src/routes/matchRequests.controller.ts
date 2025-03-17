import { Request, Response } from 'express';

import {
  getAllMatchRequests,
  getOneMatchRequest,
  createMatchRequest,
  cancelMatchRequest,
  getAllMatchesCreatedByUser,
  getAllMatchesJoinedByUser,
  getAllMatchesByUser,
} from '../services/matchRequestServices';

export const httpGetAllMatchRequests = async (req: Request, res: Response) => {
  try {
    const matches = await getAllMatchRequests();
    return res.status(200).json(matches);
  } catch (err) {
    console.error(err);
  }
};

export const httpGetOneMatchRequest = async (req: Request, res: Response) => {
  try {
    const match = await getOneMatchRequest(+req.params.id);
    return res.status(200).json(match);
  } catch (err) {
    console.error(err);
  }
};

export const httpCreateMatchRequest = async (req: Request, res: Response) => {
  try {
    const createdMatchRequest = await createMatchRequest(req.body);
    return res.status(200).json(createdMatchRequest);
  } catch (err) {
    console.error(err);
  }
};

export const httpCancelMatchRequest = async (req: Request, res: Response) => {
  try {
    const cancelledMatch = await cancelMatchRequest(+req.params.id);
    return res.status(200).json(cancelledMatch);
  } catch (err) {
    console.error(err);
  }
};

export const httpGetAllMatchesCreatedByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const matchesCreated = await getAllMatchesCreatedByUser(+req.params.id);
    return res.status(200).json(matchesCreated);
  } catch (err) {
    console.error(err);
  }
};

export const httpGetAllMatchesJoinedByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const matchesJoined = await getAllMatchesJoinedByUser(+req.params.id);
    return res.status(200).json(matchesJoined);
  } catch (err) {
    console.error(err);
  }
};

export const httpGetAllMatchesByUser = async (req: Request, res: Response) => {
  try {
    const matches = await getAllMatchesByUser(+req.params.id);
    return res.status(200).json(matches);
  } catch (err) {
    console.error(err);
  }
};
