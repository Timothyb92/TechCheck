import { Request, Response } from 'express';

import {
  getAllCharacters,
  getOneCharacter,
} from '../services/characterServices';

export const httpGetAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await getAllCharacters();
    return res.status(200).json(characters);
  } catch (err) {
    console.error(err);
  }
};

export const httpGetOneCharacter = async (req: Request, res: Response) => {
  try {
    const character = await getOneCharacter(+req.params.id);
    return res.status(200).json(character);
  } catch (err) {
    console.error(err);
  }
};
