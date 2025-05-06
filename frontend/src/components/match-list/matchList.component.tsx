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
              playerOneCfn={match.playerOneCfn}
              characterOneId={match.characterOneId}
              creatorSocketId={match.creatorSocketId}
              playerTwoId={match.playerTwoId}
              playerTwoCfn={match.playerTwoCfn}
              characterTwoId={match.characterTwoId}
            ></MatchCard>
          );
        })}
      </div>
    </>
  );
};
