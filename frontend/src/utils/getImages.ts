const rankImages = import.meta.glob<{ default: string }>(
  '../assets/rank-images/*.png',
  {
    eager: true,
  }
);

const characterImages = import.meta.glob<{ default: string }>(
  '../assets/character-images/*.png',
  {
    eager: true,
  }
);

export const getCharacterImage = (charNumber: number) => {
  const path = `../assets/character-images/char_${charNumber}.png`;
  return characterImages[path]?.default;
};

export const getRankImage = (rankNumber: number) => {
  const path = `../assets/rank-images/rank${rankNumber}.png`;
  return rankImages[path]?.default;
};
