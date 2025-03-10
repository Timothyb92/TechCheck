import Rank from '../models/ranks';

export const getAllRanks = async () => {
  try {
    return await Rank.findAll();
  } catch (err) {
    console.error(err);
  }
};

export const getOneRank = async (rankId: number) => {
  try {
    return await Rank.findByPk(rankId);
  } catch (err) {
    console.error(err);
  }
};
