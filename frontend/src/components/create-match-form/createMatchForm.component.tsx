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
  const [roomId, setRoomId] = useState('');
  const [ranks, setRanks] = useState<RankType[]>([]);
  const [minRank, setMinRank] = useState<RankType>({ id: 1, name: 'Any Rank' });
  const [maxRank, setMaxRank] = useState<RankType>({
    id: 40,
    name: 'Any Rank',
  });
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>({
    id: 999,
    name: 'Any Character',
  });

  const styles = {
    formItem:
      'w-full rounded-md bg-[#242424] px-4 py-2 text-lg font-semibold text-[#eee] shadow-[inset_0_1px_0_#ffffff88,0_0_6px_#8f00ff,0_0_12px_#8f00ff]',
    formItemWarning:
      'w-full rounded-md bg-[#242424] px-4 py-2 text-lg font-semibold text-[#eee] shadow-[inset_0_1px_0_red,0_0_6px_red,0_0_12px_red]',
  };

  const navigate = useNavigate();

  const roomIdExists = roomId.length > 0;

  useEffect(() => {
    const getCharacters = async () => {
      const response = await http.get<CharacterType[]>(`/api/characters`);
      setCharacters([...response.data]);
    };

    const getRanks = async () => {
      const response = await http.get<RankType[]>(`/api/ranks`);
      setRanks([...response.data]);
    };

    getRanks();
    getCharacters();
  }, []);

  return (
    <div className="my-6 flex w-[95%] flex-col items-center justify-center sm:w-[80%]">
      <h1 className="arcade-glow">Create Match</h1>

      <div className="flex w-full flex-col items-start">
        <div className="my-6 flex w-full flex-col items-start gap-4">
          <label htmlFor="Custom Room ID" className="text-[20px] font-bold">
            Room ID
          </label>
          <span className="text-sm text-[#a4a4a4]">Required</span>
          <input
            className={roomIdExists ? styles.formItem : styles.formItemWarning}
            type="text"
            name="Custom Room ID"
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <div className="my-6 flex w-full flex-col items-start gap-4">
          <label htmlFor="characters" className="text-[20px] font-bold">
            Select Opponent Character
          </label>
          <CharacterList
            characters={characters}
            className={styles.formItem}
            options={{ showAnyCharacter: true }}
            selectedChar={selectedChar}
            onChangeCallback={(e) => {
              const charId = Number(e.target.value);
              const char = characters.find((c) => c.id === charId);
              setSelectedChar(char || null);
            }}
          />
        </div>

        <div className="my-6 flex w-full flex-col items-start gap-4">
          <label htmlFor="min rank" className="text-[20px] font-bold">
            Minimum Rank Requirement
          </label>
          <select
            className={styles.formItem}
            name="min rank"
            id="min rank"
            onChange={(e) => {
              const rankId = Number(e.target.value) - 1;
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

        <div className="my-6 flex w-full flex-col items-start gap-4">
          <label htmlFor="max rank" className="text-[20px] font-bold">
            Maximum Rank Requirement
          </label>
          <select
            className={styles.formItem}
            name="max rank"
            id="max rank"
            onChange={(e) => {
              const rankId = Number(e.target.value) - 1;
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

        <Button
          className={`arcade-button mt-4 w-full items-center justify-center text-center ${roomIdExists ? '' : 'disabled'}`}
          onClick={
            roomIdExists
              ? () => {
                  if (!selectedChar || !minRank || !maxRank) {
                    return new Error(
                      'Missing character or min/max rank selection'
                    );
                  } else if (maxRank < minRank) {
                    return new Error("Max rank can't be higehr than min rank");
                  }
                  emitCreateMatch(
                    user as UserType,
                    roomId,
                    selectedChar.id,
                    minRank.id,
                    maxRank.id
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
    </div>
  );
};
