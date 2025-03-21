import { Request, Response } from 'express';

import {
  getAllUserBlocks,
  blockUser,
  unblockUser,
} from '../services/userBlockServices';

export const httpGetAllUserBlocks = async (req: Request, res: Response) => {
  try {
    const blockList = await getAllUserBlocks();
    return res.status(200).json(blockList);
  } catch (err) {
    console.error(err);
  }
};

export const httpBlockUser = async (req: Request, res: Response) => {
  try {
    const newBlock = await blockUser(req.body);
    return res.status(200).json(newBlock);
  } catch (err) {
    console.error(err);
  }
};

export const httpUnblockUser = async (req: Request, res: Response) => {
  try {
    const removedBlock = await unblockUser(req.body);
    return res.status(200).json(removedBlock);
  } catch (err) {
    console.error(err);
  }
};
