import { MatchType } from '../../types/types';

import { MatchCard } from '../match-card/matchCard.component';

import './matchList.styles.css';

interface MatchListProps {
  matches: MatchType[] | null;
}

export const MatchList = ({ matches }: MatchListProps) => {
  return (
    <>
      <div className="match-list-container">
        {matches ? (
          matches.map((match) => {
            if (match.status !== 'cancelled' && match.status !== 'completed') {
              return (
                <MatchCard
                  key={match.id}
                  // id={match.id}
                  // playerOneId={match.playerOneId}
                  // playerOneCfn={match.playerOneCfn}
                  // characterOneId={match.characterOneId}
                  // creatorSocketId={match.creatorSocketId}
                  // playerTwoId={match.playerTwoId}
                  // playerTwoCfn={match.playerTwoCfn}
                  // characterTwoId={match.characterTwoId}
                  // status={match.status}
                  // locale={match.locale}
                  // characterOne={match.characterOne}
                  // characterTwo={match.characterTwo}
                  // minRank={match.minRank}
                  // maxRank={match.maxRank}
                  {...match}
                ></MatchCard>
              );
            }
          })
        ) : (
          <div>No matches</div>
        )}
      </div>
    </>
  );
};
