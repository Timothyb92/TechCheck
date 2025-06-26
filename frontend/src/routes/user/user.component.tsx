import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../api';

import { AuthContext } from '../../contexts/auth.context';
import { getCharacterImage, getRankImage } from '../../utils/getImages';
import { Button } from '../../components/button/button.component';
import { CharacterList } from '../../components/character-list/characterList.component';

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
      const ranksWithoutANy = response.data.filter((rank) => rank.id !== 1);
      setRanks(ranksWithoutANy);
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
    <div className="my-6 flex w-[95%] flex-col items-center justify-center sm:w-[80%]">
      <h1 className="arcade-glow">User Settings</h1>
      <div className="my-6 flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold">
          {user.cfnName ? user.cfnName : 'New Challenger'}
        </h2>
        <div className="flex flex-row items-center gap-8">
          <img
            className="h-24"
            src={
              selectedChar
                ? getCharacterImage(selectedChar.id)
                : getCharacterImage(999)
            }
            alt="Selected Character"
          />
          <img
            className="h-20"
            src={
              selectedRank ? getRankImage(selectedRank.id) : getRankImage(50)
            }
            alt=""
          />
        </div>
      </div>

      <div className="flex w-[80%] flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="cfnName" className="text-2xl font-bold">
            CFN Name
          </label>
          <input
            type="text"
            id="cfnName"
            name="CFN Name"
            required
            value={cfnName}
            onChange={(e) => setCfnName(e.target.value)}
            className="w-full rounded-md bg-[#242424] px-4 py-2 text-lg font-semibold text-[#eee] shadow-[inset_0_1px_0_#ffffff88,0_0_6px_#8f00ff,0_0_12px_#8f00ff]"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="characters" className="text-2xl font-bold">
            Select Your Character
          </label>
          <CharacterList
            characters={characters}
            options={{ showAnyCharacter: false }}
            selectedChar={selectedChar}
            className="w-full rounded-md bg-[#242424] px-4 py-2 text-lg font-semibold text-[#eee] shadow-[inset_0_1px_0_#ffffff88,0_0_6px_#8f00ff,0_0_12px_#8f00ff]"
            onChangeCallback={(e) => {
              const charId = Number(e.target.value);
              const char = characters.find((c) => c.id === charId);
              setSelectedChar(char || null);
            }}
          ></CharacterList>
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="ranks" className="text-2xl font-bold">
            Select Your Rank
          </label>
          <select
            name="ranks"
            id="ranks"
            value={selectedRank?.id ?? ''}
            className="w-full rounded-md bg-[#242424] px-4 py-2 text-lg font-semibold text-[#eee] shadow-[inset_0_1px_0_#ffffff88,0_0_6px_#8f00ff,0_0_12px_#8f00ff]"
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
      </div>

      <div className="my-6 flex w-[80%] flex-col items-center gap-6">
        <Button
          className="arcade-button flex w-full items-center justify-center text-xl font-bold text-white"
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
        <Button
          className="flex w-full items-center justify-center rounded-md border-2 border-[#ff4d6d] bg-gradient-to-b from-[#e20000] to-[#b10000] px-4 py-2 text-xl font-bold text-white shadow-[inset_0_1px_0_#ffffff88,0_0_6px_#ff1a1a,0_0_12px_#ff1a1a,0_0_24px_#ff1a1a] transition-shadow duration-200 text-shadow-lg hover:shadow-[inset_0_1px_0_#ffffffaa,0_0_8px_#ff3333,0_0_16px_#ff3333,0_0_32px_#ff3333]"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
