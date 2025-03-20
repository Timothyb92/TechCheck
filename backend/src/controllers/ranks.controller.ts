import { Request, response, Response } from 'express';

import { getAllRanks, getOneRank } from '../services/rankServices';

export const httpGetAllRanks = async (req: Request, res: Response) => {
  try {
    const ranks = await getAllRanks();
    return res.status(200).json(ranks);
  } catch (err) {
    console.error(err);
  }
};

export const httpGetOneRank = async (req: Request, res: Response) => {
  try {
    const rank = await getOneRank(+req.params.id);
    return res.status(200).json(rank);
  } catch (err) {
    console.error(err);
  }
};
