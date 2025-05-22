import { useEffect, useContext, useState } from 'react';
import { http } from '../../api';

import { Button } from '../button/button.component';

import { emitCreateMatch } from '../../sockets/clientMatchSockets';
import { AuthContext } from '../../contexts/auth.context';

import { CharacterType, UserType } from '../../types/types';

export const CreateMatchForm = () => {
  const { user } = useContext(AuthContext);
  const [roomId, setRoomId] = useState('');
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>(null);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await http.get<CharacterType[]>(`/characters`);
      setCharacters([...response.data]);
    };
    getCharacters();
  }, []);

  return (
    <>
      <form>
        <input
          type="text"
          name="Custom Room ID"
          required
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <label htmlFor="characters">Select Opponent Character</label>
        <select
          name="characters"
          id="characters"
          onChange={(e) => {
            const charId = Number(e.target.value);
            const char = characters.find((c) => c.id === charId);
            setSelectedChar(char || null);
          }}
        >
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
        <Button
          onClick={() =>
            emitCreateMatch(user as UserType, roomId, selectedChar?.id)
          }
        >
          Create Match
        </Button>
      </form>
    </>
  );
};
