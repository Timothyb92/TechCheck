import { MatchType } from '../../types/types';

import { MatchCard } from '../match-card/matchCard.component';

interface MatchListProps {
  matches: MatchType[];
}

export const MatchList = ({ matches }: MatchListProps) => {
  return (
    <>
      <div className="match-list-container">
        {matches.map((match) => {
          return (
            <MatchCard
              playerOneId={match.playerOneId}
              characterOneId={match.characterOneId}
            ></MatchCard>
          );
        })}
      </div>
    </>
  );
};
