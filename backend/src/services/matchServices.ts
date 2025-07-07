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
    if (match.maxRankId < match.minRankId && match.maxRankId !== 999) {
      throw new Error("Max rank can't be lower than min rank");
    }
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
        as: 'playerOne',
        attributes: [
          'id',
          'rankId',
          'mainCharacterId',
          'cfnName',
          'canApplyJoin',
          'locale',
          'userCode',
        ],
        include: [
          {
            model: Character,
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: User,
        as: 'playerTwo',
        attributes: [
          'id',
          'rankId',
          'mainCharacterId',
          'cfnName',
          'canApplyJoin',
          'locale',
          'userCode',
        ],
        include: [
          {
            model: Character,
            attributes: ['id', 'name'],
          },
        ],
      },
    ],
    attributes: {
      exclude: ['playerOneId', 'playerTwoId', 'minRankId', 'maxRankId'],
    },
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
        as: 'playerOne',
        attributes: [
          'id',
          'rankId',
          'mainCharacterId',
          'cfnName',
          'canApplyJoin',
          'locale',
          'userCode',
        ],
        include: [
          {
            model: Character,
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: User,
        as: 'playerTwo',
        attributes: [
          'id',
          'rankId',
          'mainCharacterId',
          'cfnName',
          'canApplyJoin',
          'locale',
          'userCode',
        ],
        include: [
          {
            model: Character,
            attributes: ['id', 'name'],
          },
        ],
      },
    ],
  });
};

export const getOneMatch = async (matchId: number) => {
  return await Match.findByPk(matchId, {
    include: [
      {
        model: Character,
        as: 'characterTwo',
        attributes: ['id', 'name'],
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
        as: 'playerOne',
        attributes: [
          'id',
          'rankId',
          'mainCharacterId',
          'cfnName',
          'canApplyJoin',
          'locale',
          'userCode',
        ],
        include: [
          {
            model: Character,
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: User,
        as: 'playerTwo',
        attributes: [
          'id',
          'rankId',
          'mainCharacterId',
          'cfnName',
          'canApplyJoin',
          'locale',
          'userCode',
        ],
        include: [
          {
            model: Character,
            attributes: ['id', 'name'],
          },
        ],
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
    return await getOneMatch(matchId);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllMatchesCreatedByUser = async (userId: number) => {
  try {
    const matchesCreated = await Match.findAll({
      where: { playerOneId: userId },
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
          model: User,
          as: 'playerOne',
          attributes: [
            'id',
            'rankId',
            'mainCharacterId',
            'cfnName',
            'canApplyJoin',
            'locale',
            'userCode',
          ],
          include: [
            {
              model: Character,
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model: User,
          as: 'playerTwo',
          attributes: [
            'id',
            'rankId',
            'mainCharacterId',
            'cfnName',
            'canApplyJoin',
            'locale',
            'userCode',
          ],
          include: [
            {
              model: Character,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    return match;
  } catch (err) {
    console.error(err);
  }
};
