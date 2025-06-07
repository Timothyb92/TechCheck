import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../api';

import './user.styles.css';

import { AuthContext } from '../../contexts/auth.context';
import { getCharacterImage, getRankImage } from '../../utils/getImages';
import { Button } from '../../components/button/button.component';

import { CharacterType, RankType, UserType } from '../../types/types';

export const User = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>();
  const [ranks, setRanks] = useState<RankType[]>([]);
  const [selectedRank, setSelectedRank] = useState<RankType | null>(null);
  const [cfnName, setCfnName] = useState<string | undefined>('');

  const navigate = useNavigate();

  useEffect(() => {
    const getCharacters = async () => {
      const response = await http.get<CharacterType[]>(`/api/characters`);
      setCharacters(response.data);
    };

    const getRanks = async () => {
      const response = await http.get<RankType[]>(`/api/ranks`);
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
    <div className="user-settings-container">
      <h1 className="arcade-glow">User Settings</h1>
      <div className="current-settings">
        <h2 className="username">
          {user.cfnName ? user.cfnName : 'New Challenger'}
        </h2>
        <div className="name-rank-char">
          <img
            className="selected-char-img"
            src={
              selectedChar
                ? getCharacterImage(selectedChar.id)
                : getCharacterImage(999)
            }
            alt="Selected Character"
          />
          <img
            className="selected-rank-img"
            src={
              selectedRank ? getRankImage(selectedRank.id) : getRankImage(50)
            }
            alt=""
          />
        </div>
      </div>
      <div className="user-settings">
        {/* <form> */}
        <div className="user-settings-selection">
          <label htmlFor="cfnName">CFN Name</label>
          <input
            type="text"
            id="cfnName"
            name="CFN Name"
            required
            value={cfnName}
            onChange={(e) => setCfnName(e.target.value)}
          />
        </div>

        <div className="user-settings-selection">
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
        </div>

        <div className="user-settings-selection">
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
            {ranks.map((rank) => {
              if (rank.id === 1) return;
              return (
                <option key={rank.id} value={rank.id - 1}>
                  {rank.name}
                </option>
              );
            })}
          </select>
        </div>

        <Button
          className="update-user-button arcade-button"
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

            await http.patch<UserType>(`/api/users/${user.id}`, updatedUser);
            navigate('/lobby');
          }}
        >
          Update User
        </Button>
        <Button className="update-user-button logout-button" onClick={logout}>
          Logout
        </Button>
        {/* </form> */}
      </div>
    </div>
  );
};
