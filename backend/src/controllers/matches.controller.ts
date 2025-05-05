import { Request, Response } from 'express';

import {
  getAllMatches,
  getOneMatch,
  createMatch,
  updateMatch,
  getAllMatchesCreatedByUser,
  getAllMatchesJoinedByUser,
  getAllMatchesByUser,
  getAllOpenMatches,
} from '../services/matchServices';

export const httpGetAllMatches = async (req: Request, res: Response) => {
  try {
    const matches = await getAllMatches();
    return res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

export const httpGetAllOpenMatches = async (req: Request, res: Response) => {
  try {
    const matches = await getAllOpenMatches();
    return res.status(200).json(matches);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const httpGetOneMatch = async (req: Request, res: Response) => {
  try {
    const match = await getOneMatch(+req.params.id);
    return res.status(200).json(match);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

export const httpCreateMatch = async (req: Request, res: Response) => {
  try {
    const createdMatch = await createMatch(req.body);
    return res.status(200).json(createdMatch);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

export const httpUpdateMatch = async (req: Request, res: Response) => {
  try {
    const updatedMatch = await updateMatch(+req.params.id, req.body);
    return res.status(200).json(updatedMatch);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
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
    return res.status(500).json({ error: err });
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
    return res.status(500).json({ error: err });
  }
};

export const httpGetAllMatchesByUser = async (req: Request, res: Response) => {
  try {
    const matches = await getAllMatchesByUser(+req.params.id);
    return res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};
