import { useContext } from 'react';
// import { MatchType } from '../../types/types';

import { MatchCard } from '../match-card/matchCard.component';

import { MatchesContext } from '../../contexts/matches.context';

import './matchList.styles.css';

// interface MatchListProps {
//   matches: MatchType[] | null;
// }

export const MatchList = () => {
  const { matches } = useContext(MatchesContext);
  // export const MatchList = ({ matches }: MatchListProps) => {
  return (
    <>
      <div className="match-list-container">
        {matches ? (
          matches.map((match) => {
            return (
              <MatchCard
                key={match.id}
                id={match.id}
                playerOneId={match.playerOneId}
                playerOneCfn={match.playerOneCfn}
                characterOneId={match.characterOneId}
                creatorSocketId={match.creatorSocketId}
                playerTwoId={match.playerTwoId}
                playerTwoCfn={match.playerTwoCfn}
                characterTwoId={match.characterTwoId}
                status={match.status}
                locale={match.locale}
                characterOne={match.characterOne}
                characterTwo={match.characterTwo}
              ></MatchCard>
            );
          })
        ) : (
          <div>No matches</div>
        )}
      </div>
    </>
  );
};
