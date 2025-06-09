import Match from '../models/matches.model';
import Character from '../models/characters.model';
import Rank from '../models/ranks.model';
import User from '../models/users.model';

import {
  InferCreationAttributes,
  InferAttributes,
  Op,
  or,
  Model,
} from 'sequelize';

type Updates = {
  playerTwoId?: number | null;
  characterTwoId?: number | null;
  playerTwoCfn?: string | null;
  applicantCharId?: number | null;
  status?: string;
};

const validateCrateMatch = async (userId: number) => {
  let canCreateMatch: boolean;
  const openMatches = await Match.findAll({
    where: {
      playerOneId: userId,
      status: {
        [Op.notIn]: ['cancelled', 'completed'],
      },
    },
  });
  canCreateMatch = openMatches.length > 0 ? false : true;
  return canCreateMatch;
};

export const createMatch = async (match: InferCreationAttributes<Match>) => {
  if (await validateCrateMatch(match.playerOneId)) {
    const newMatch = await Match.create(match);
    return getOneMatch(newMatch.id);
  } else {
    throw new Error('User already has open match');
  }
};

export const getAllMatches = async () => {
  return await Match.findAll({
    include: [
      {
        model: Character,
        as: 'characterOne',
        attributes: ['name'],
      },
      {
        model: Character,
        as: 'characterTwo',
        attributes: ['name'],
      },
      {
        model: Rank,
        as: 'minRank',
        attributes: ['name', 'id'],
      },
      {
        model: Rank,
        as: 'maxRank',
        attributes: ['name', 'id'],
      },
    ],
  });
};

export const getAllOpenMatches = async () => {
  return await Match.findAll({
    where: {
      status: {
        [Op.notIn]: ['cancelled', 'completed'],
      },
    },
    include: [
      {
        model: Character,
        as: 'characterOne',
        attributes: ['name', 'id'],
      },
      {
        model: Character,
        as: 'characterTwo',
        attributes: ['name', 'id'],
      },
      {
        model: Rank,
        as: 'minRank',
        attributes: ['name', 'id'],
      },
      {
        model: Rank,
        as: 'maxRank',
        attributes: ['name', 'id'],
      },
      {
        model: User,
        as: 'player1',
        attributes: ['rankId'],
      },
    ],
  });
};

export const getOneMatch = async (matchId: number) => {
  return await Match.findByPk(matchId, {
    include: [
      {
        model: Character,
        as: 'characterOne',
        attributes: ['name'],
      },
      {
        model: Character,
        as: 'characterTwo',
        attributes: ['name'],
      },
      {
        model: Rank,
        as: 'minRank',
        attributes: ['name', 'id'],
      },
      {
        model: Rank,
        as: 'maxRank',
        attributes: ['name', 'id'],
      },
    ],
  });
};

export const updateMatch = async (matchId: number, updates: Updates) => {
  try {
    const match = await getOneMatch(matchId);

    if (!match) {
      throw new Error(`No match found`);
    }

    if (updates.status === 'pending' && match.status !== 'open') {
      throw new Error(`Can't apply to match that isn't open`);
    }

    Object.assign(match, updates);
    await match.save();
    return match;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllMatchesCreatedByUser = async (userId: number) => {
  try {
    const matchesCreated = await Match.findAll({
      where: { playerOneId: userId },
      include: [
        {
          model: Character,
          as: 'characterOne',
          attributes: ['name'],
        },
        {
          model: Character,
          as: 'characterTwo',
          attributes: ['name'],
        },
        {
          model: Rank,
          as: 'minRank',
          attributes: ['name', 'id'],
        },
        {
          model: Rank,
          as: 'maxRank',
          attributes: ['name', 'id'],
        },
      ],
    });
    return matchesCreated;
  } catch (err) {
    console.error(err);
  }
};

export const getAllMatchesJoinedByUser = async (userId: number) => {
  try {
    const matchesCreated = await Match.findAll({
      where: { playerTwoId: userId },
      include: [
        {
          model: Character,
          as: 'characterOne',
          attributes: ['name'],
        },
        {
          model: Character,
          as: 'characterTwo',
          attributes: ['name'],
        },
        {
          model: Rank,
          as: 'minRank',
          attributes: ['name', 'id'],
        },
        {
          model: Rank,
          as: 'maxRank',
          attributes: ['name', 'id'],
        },
      ],
    });
    return matchesCreated;
  } catch (err) {
    console.error(err);
  }
};

export const getAllMatchesByUser = async (userId: number) => {
  try {
    const matches = await Match.findAll({
      where: {
        [Op.or]: [{ playerOneId: userId }, { playerTwoId: userId }],
      },
      include: [
        {
          model: Character,
          as: 'characterOne',
          attributes: ['name'],
        },
        {
          model: Character,
          as: 'characterTwo',
          attributes: ['name'],
        },
        {
          model: Rank,
          as: 'minRank',
          attributes: ['name', 'id'],
        },
        {
          model: Rank,
          as: 'maxRank',
          attributes: ['name', 'id'],
        },
      ],
    });
    return matches;
  } catch (err) {
    console.error(err);
  }
};

export const getActiveMatchesByUser = async (userId: number) => {
  try {
    const match = await Match.findOne({
      where: {
        [Op.or]: [{ playerOneId: userId }, { playerTwoId: userId }],
        status: {
          [Op.notIn]: ['cancelled', 'completed'],
        },
      },
      include: [
        {
          model: Character,
          as: 'characterOne',
          attributes: ['name'],
        },
        {
          model: Character,
          as: 'characterTwo',
          attributes: ['name'],
        },
        {
          model: Rank,
          as: 'minRank',
          attributes: ['name', 'id'],
        },
        {
          model: Rank,
          as: 'maxRank',
          attributes: ['name', 'id'],
        },
      ],
    });
    return match;
  } catch (err) {
    console.error(err);
  }
};
