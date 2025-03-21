import { Request, Response } from 'express';

import {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
} from '../services/userServices';

export const httpGetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
  }
};

export const httpGetOneUser = async (req: Request, res: Response) => {
  try {
    const userId = +req.params.id;
    const user = await getOneUser(userId);
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

export const httpCreateUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
  }
};

export const httpDeleteUser = async (req: Request, res: Response) => {
  try {
    console.log('Running httpDelteUser');
    const userId = +req.params.id;
    const deletedUser = deleteUser(userId);
    res.json(deletedUser);
  } catch (err) {
    console.error(err);
  }
};

export const httpUpdateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(+req.params.id, req.body);
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
  }
};
