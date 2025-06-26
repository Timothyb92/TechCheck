import { MatchType } from '../../types/types';

import { MatchCard } from '../match-card/matchCard.component';

import './matchList.styles.css';

interface MatchListProps {
  matches: MatchType[] | null;
}

export const MatchList = ({ matches }: MatchListProps) => {
  return (
    <>
      <div className="mt-5 flex w-full flex-col">
        {matches ? (
          matches.map((match) => {
            if (match.status !== 'cancelled' && match.status !== 'completed') {
              return <MatchCard key={match.id} {...match}></MatchCard>;
            }
          })
        ) : (
          <div>No matches</div>
        )}
      </div>
    </>
  );
};
