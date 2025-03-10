import Character from '../models/characters';

export const getAllCharacters = async () => {
  return await Character.findAll();
};

export const getOneCharacter = async (characterId: number) => {
  return await Character.findByPk(characterId);
};
