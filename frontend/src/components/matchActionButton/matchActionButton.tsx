import { MatchType, UserType } from '../../types/types';

import { Button } from '../button/button.component';

export const matchActionButton = (match: MatchType, user: UserType) => {
  if (!user) return null;

  const isOwner = match.playerOneId === user.id;

  switch (match.status) {
    case 'open':
      return isOwner ? (
        <Button>Cancel Match</Button>
      ) : (
        <Button>Join Match</Button>
      );

    case 'pending':
      return isOwner ? (
        <div>
          <Button>Accept</Button>
          <Button>Decline</Button>
          <Button>Block User</Button>
        </div>
      ) : (
        <div>
          <Button disabled>Join Match</Button>
          <Button>Cancel Join</Button>
        </div>
      );

    case 'matched':
      return null;
  }
};
