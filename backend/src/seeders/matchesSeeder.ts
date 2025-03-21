import Match from '../models/matches.model';

// type MatchSeedData = Omit<Partial<Match>, 'id'> & { id?: number };

const Matches = [
  {
    playerOneId: 1,
    characterOneId: 23,
    status: 'completed',
    playerTwoId: 2,
    characterTwoId: 21,
  },
  {
    playerOneId: 2,
    characterOneId: 23,
    status: 'completed',
    playerTwoId: 1,
    characterTwoId: 21,
  },
  {
    playerOneId: 1,
    characterOneId: 23,
    status: 'cancelled',
  },
  {
    playerOneId: 2,
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
