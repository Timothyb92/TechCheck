import { MatchType } from '../../types/types';

import { MatchCard } from '../match-card/matchCard.component';

interface MatchListProps {
  matches: MatchType[] | null;
  emptyIcon?: React.ReactNode;
  emptyMessage?: string;
}

export const MatchList = ({
  matches,
  emptyIcon,
  emptyMessage = 'No matches yet.',
}: MatchListProps) => {
  const visibleMatches =
    matches?.filter(
      (match) => match.status !== 'cancelled' && match.status !== 'completed'
    ) ?? [];

  return (
    <div className="mt-5 flex w-full flex-col items-center">
      <div className="w-full xl:w-[65%]">
        {visibleMatches.length > 0 ? (
          visibleMatches.map((match) => (
            <MatchCard key={match.id} {...match}></MatchCard>
          ))
        ) : (
          <div className="empty-state">
            {emptyIcon}
            <p>{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};
