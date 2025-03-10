import express from 'express';

import {
  httpGetAllCharacters,
  httpGetOneCharacter,
} from '../routes/characters.controller';

const characterRouter = express.Router();

characterRouter.route('/').get(httpGetAllCharacters);

characterRouter.route('/:id').get(httpGetOneCharacter);

export default characterRouter;
