import express from 'express';

import {
  httpGetAllCharacters,
  httpGetOneCharacter,
} from '../controllers/characters.controller';

const characterRouter = express.Router();

characterRouter.route('/').get(httpGetAllCharacters);

characterRouter.route('/:id').get(httpGetOneCharacter);

export default characterRouter;
