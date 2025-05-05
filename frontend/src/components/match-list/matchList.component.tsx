import { MatchType } from '../../types/types';

import { MatchCard } from '../match-card/matchCard.component';

import './matchList.styles.css';

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
              key={match.id}
              playerOneId={match.playerOneId}
              characterOneId={match.characterOneId}
              creatorSocketId={match.creatorSocketId}
            ></MatchCard>
          );
        })}
      </div>
    </>
  );
};
