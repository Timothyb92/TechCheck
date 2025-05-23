import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../api';

import { AuthContext } from '../../contexts/auth.context';
import { Button } from '../../components/button/button.component';

import { CharacterType, RankType, UserType } from '../../types/types';

export const User = () => {
  const { user, setUser } = useContext(AuthContext);
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>();
  const [ranks, setRanks] = useState<RankType[]>([]);
  const [selectedRank, setSelectedRank] = useState<RankType | null>(null);
  const [cfnName, setCfnName] = useState<string | undefined>('');

  const navigate = useNavigate();

  useEffect(() => {
    const getCharacters = async () => {
      const response = await http.get<CharacterType[]>(`/characters`);
      setCharacters(response.data);
    };

    const getRanks = async () => {
      const response = await http.get<RankType[]>(`/ranks`);
      setRanks(response.data);
    };

    getRanks();
    getCharacters();
  }, []);

  useEffect(() => {
    if (!user || characters.length === 0 || ranks.length === 0) return;

    setCfnName(user.cfnName ?? '');

    if (user.mainCharacterId) {
      const char = characters.find((c) => c.id === user.mainCharacterId);
      setSelectedChar(char || null);
    }

    if (user.rankId) {
      const rank = ranks.find((r) => r.id === user.rankId);
      setSelectedRank(rank || null);
    }
  }, [user, characters, ranks]);

  if (!user) return <div>No user</div>;

  const updateUser = (updatedUser: typeof user) => {
    setUser({
      ...user,
      ...updatedUser,
    });
  };

  return (
    <>
      <div>
        <form>
          <label htmlFor="characters">Select Your Character</label>
          <select
            name="characters"
            id="characters"
            value={selectedChar?.id ?? ''}
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

          <br />

          <label htmlFor="ranks">Select Your Rank</label>
          <select
            name="ranks"
            id="ranks"
            value={selectedRank?.id ?? ''}
            onChange={(e) => {
              const rankId = Number(e.target.value);
              const rank = ranks.find((r) => r.id === rankId);
              setSelectedRank(rank || null);
            }}
          >
            {ranks.map((rank) => (
              <option key={rank.id} value={rank.id}>
                {rank.name}
              </option>
            ))}
          </select>

          <br />

          <label htmlFor="cfnName">CFN Name</label>
          <input
            type="text"
            id="cfnName"
            name="CFN Name"
            required
            value={cfnName}
            onChange={(e) => setCfnName(e.target.value)}
          />
          <br />
          <Button
            type="button"
            onClick={async () => {
              if (!selectedChar || !selectedRank || !cfnName) {
                return;
              }
              const updatedUser = {
                ...user,
                mainCharacterId: selectedChar.id,
                rankId: selectedRank.id,
                cfnName,
              };

              updateUser(updatedUser);

              await http.patch<UserType>(`/users/${user.id}`, updatedUser);
              navigate('/lobby');
            }}
          >
            Update User
          </Button>
        </form>
      </div>
    </>
  );
};
