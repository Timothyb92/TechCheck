import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../api';

import './createMatchForm.styles.css';

import { Button } from '../button/button.component';
import { CharacterList } from '../character-list/characterList.component';

import { emitCreateMatch } from '../../sockets/clientMatchSockets';
import { AuthContext } from '../../contexts/auth.context';

import { CharacterType, UserType, RankType } from '../../types/types';

export const CreateMatchForm = () => {
  const { user } = useContext(AuthContext);
  const [ranks, setRanks] = useState<RankType[]>([]);
  const [passcode, setPasscode] = useState('');
  const [minRank, setMinRank] = useState<RankType>(
    ranks.find((r) => r.id === 999) || { id: 999, name: 'Any Character' }
  );
  const [maxRank, setMaxRank] = useState<RankType>({
    id: 999,
    name: 'Any Rank',
  });
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>({
    id: 999,
    name: 'Any Character',
  });
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getCharacters = async () => {
      const response = await http.get<CharacterType[]>(`/api/characters`);
      setCharacters([...response.data]);
    };

    const getRanks = async () => {
      const response = await http.get<RankType[]>(`/api/ranks`);
      setRanks([...response.data]);
    };

    Promise.all([getRanks(), getCharacters()]).finally(() =>
      setIsLoading(false)
    );
  }, []);

  const isValidRankSelection =
    minRank.id === 999 || maxRank.id === 999 || minRank.id <= maxRank.id;

  return (
    <div className="my-6 flex w-[95%] flex-col items-center justify-center sm:w-[80%] sm:max-w-3xl">
      <h1 className="arcade-glow mb-8">Create Match</h1>

      <div className="panel w-full p-5 sm:p-8">
        {isLoading ? (
          <p className="py-10 text-center text-white/60">
            Loading characters and ranks…
          </p>
        ) : (
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full flex-col items-start gap-2">
              <label
                htmlFor="Custom Room ID"
                className="text-[18px] font-bold"
              >
                Custom Room Passcode
              </label>
              <input
                className="field-input"
                type="text"
                name="Custom Room ID"
                placeholder="e.g. 1234"
                required
                value={passcode}
                maxLength={4}
                onChange={(e) => setPasscode(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col items-start gap-2">
              <label htmlFor="characters" className="text-[18px] font-bold">
                Select Opponent Character
              </label>
              <CharacterList
                characters={characters}
                className="field-select"
                options={{ showAnyCharacter: true }}
                selectedChar={selectedChar}
                onChangeCallback={(e) => {
                  const charId = Number(e.target.value);
                  const char = characters.find((c) => c.id === charId);
                  setSelectedChar(char || null);
                }}
              />
            </div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="min rank" className="text-[18px] font-bold">
                  Minimum Rank
                </label>
                <select
                  className="field-select"
                  name="min rank"
                  id="min-rank"
                  value={minRank.id}
                  onChange={(e) => {
                    const rankId = Number(e.target.value);
                    const rank = ranks.find((r) => r.id === rankId);
                    if (!rank) return new Error('No min rank set');
                    setMinRank(rank);
                  }}
                >
                  {ranks.map((rank) => (
                    <option key={rank.id} value={rank.id}>
                      {rank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="max rank" className="text-[18px] font-bold">
                  Maximum Rank
                </label>
                <select
                  className={`field-select ${!isValidRankSelection ? 'field-error' : ''}`}
                  name="max-rank"
                  id="max rank"
                  value={maxRank.id}
                  onChange={(e) => {
                    const rankId = Number(e.target.value);
                    const rank = ranks.find((r) => r.id === rankId);
                    if (!rank) return new Error('No max rank set');
                    setMaxRank(rank);
                  }}
                >
                  {ranks.map((rank) => (
                    <option key={rank.id} value={rank.id}>
                      {rank.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {!isValidRankSelection && (
              <p className="-mt-4 text-sm text-red-400">
                Max rank must be equal to or higher than min rank.
              </p>
            )}

            <Button
              className={`arcade-button mt-2 w-full items-center justify-center text-center ${!isValidRankSelection ? 'disabled max-rank-disabled' : ''}`}
              disabled={!isValidRankSelection}
              onClick={
                isValidRankSelection
                  ? () => {
                      if (!selectedChar || !minRank || !maxRank) {
                        return new Error(
                          'Missing character or min/max rank selection'
                        );
                      }
                      emitCreateMatch(
                        user as UserType,
                        passcode,
                        selectedChar.id,
                        minRank.id === 999 ? 1 : minRank.id,
                        maxRank.id === 999 ? 40 : maxRank.id
                      );
                      navigate('/lobby');
                    }
                  : () => {
                      return new Error('Missing Custom Room ID');
                    }
              }
            >
              Create Match
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
