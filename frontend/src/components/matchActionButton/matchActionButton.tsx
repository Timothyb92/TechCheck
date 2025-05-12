import { MatchType, UserType } from '../../types/types';

import { Button } from '../button/button.component';

export const matchActionButton = (
  match: MatchType,
  user: UserType,
  action: () => void
) => {
  if (!user) return null;

  const isOwner = match.playerOneId === user.id;

  switch (match.status) {
    case 'open':
      return isOwner ? (
        <Button onClick={action}>Cancel Match</Button>
      ) : (
        <Button onClick={action}>Join Match</Button>
      );

    case 'pending':
      return isOwner ? (
        <div>
          <Button onClick={action}>Accept</Button>
          <Button onClick={action}>Decline</Button>
          <Button onClick={action}>Block User</Button>
        </div>
      ) : (
        <div>
          <Button onClick={action} disabled>
            Join Match
          </Button>
          <Button onClick={action}>Cancel Join</Button>
        </div>
      );

    case 'matched':
      return null;
  }
};
