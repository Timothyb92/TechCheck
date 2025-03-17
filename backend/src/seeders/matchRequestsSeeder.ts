import MatchRequest from '../models/matchRequests';

const MatchRequests = [
  {
    id: 1,
    playerOneId: 1,
    characterOneId: 23,
    status: 'completed',
    playerTwoId: 2,
    characterTwoId: 21,
  },
  {
    id: 2,
    playerOneId: 2,
    characterOneId: 23,
    status: 'completed',
    playerTwoId: 1,
    characterTwoId: 21,
  },
  {
    id: 3,
    playerOneId: 1,
    characterOneId: 23,
    status: 'cancelled',
  },
  {
    id: 4,
    playerOneId: 2,
    characterOneId: 21,
    status: 'open',
  },
];

export const seedMatchRequests = async () => {
  try {
    await MatchRequest.bulkCreate(MatchRequests, { ignoreDuplicates: true });
    console.log('✅ MatchRequests table seeded successfully');
  } catch (err) {
    console.error(err);
  }
};
