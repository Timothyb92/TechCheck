import Match from '../models/matches.model';

const Matches = [
  {
    playerOneId: 1,
    playerOneCfn: 'TzMFk',
    characterOneId: 23,
    status: 'completed',
    playerTwoId: 2,
    playerTwoCfn: 'Ninjoh',
    characterTwoId: 21,
    locale: 'en-US',
    customRoomId: '12341234',
    minRankId: 1,
    maxRankId: 1,
  },
  {
    playerOneId: 2,
    playerOneCfn: 'Ninjoh',
    characterOneId: 23,
    status: 'completed',
    playerTwoId: 1,
    playerTwoCfn: 'TzMFk',
    characterTwoId: 21,
    locale: 'en-US',
    customRoomId: '43124312',
    minRankId: 1,
    maxRankId: 1,
  },
  {
    playerOneId: 1,
    playerOneCfn: 'TzMFk',
    characterOneId: 23,
    characterTwoId: 1,
    status: 'cancelled',
    locale: 'en-US',
    customRoomId: '43124312',
    minRankId: 1,
    maxRankId: 1,
  },
  {
    playerOneId: 2,
    playerOneCfn: 'Ninjoh',
    characterOneId: 21,
    characterTwoId: 1,
    status: 'open',
    locale: 'en-US',
    customRoomId: '43124312',
    minRankId: 34,
    maxRankId: 40,
  },
];

export const seedMatches = async () => {
  try {
    await Match.bulkCreate(Matches, { ignoreDuplicates: true });
  } catch (err) {
    console.error(err);
  }
};
