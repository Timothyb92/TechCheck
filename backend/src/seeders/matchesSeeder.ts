import Match from '../models/matches.model';

// type MatchSeedData = Omit<Partial<Match>, 'id'> & { id?: number };

const Matches = [
  {
    playerOneId: 1,
    playerOneCfn: 'TzMFk',
    characterOneId: 23,
    status: 'completed',
    playerTwoId: 2,
    playerTwoCfn: 'Ninjoh',
    characterTwoId: 21,
  },
  {
    playerOneId: 2,
    playerOneCfn: 'Ninjoh',
    characterOneId: 23,
    status: 'completed',
    playerTwoId: 1,
    playerTwoCfn: 'TzMFk',
    characterTwoId: 21,
  },
  {
    playerOneId: 1,
    playerOneCfn: 'TzMFk',
    characterOneId: 23,
    status: 'cancelled',
  },
  {
    playerOneId: 2,
    playerOneCfn: 'Ninjoh',
    characterOneId: 21,
    status: 'open',
  },
];

export const seedMatches = async () => {
  try {
    await Match.bulkCreate(Matches, { ignoreDuplicates: true });
  } catch (err) {
    console.error(err);
  }
};
