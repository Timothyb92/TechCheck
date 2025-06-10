import { CharacterType } from '../../types/types';

type CharacterListProps = {
  characters: CharacterType[];
  options: { showAnyCharacter: boolean };
  selectedChar?: CharacterType | null;
  onChangeCallback?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

export const CharacterList = ({
  characters,
  options,
  selectedChar,
  onChangeCallback,
  className,
}: CharacterListProps) => {
  return (
    <select
      className={className}
      name="characters"
      id="characters"
      value={selectedChar?.id ?? ''}
      onChange={onChangeCallback}
    >
      {characters.map((char) => {
        if (!options.showAnyCharacter && char.id === 999) {
          return null;
        }

        return (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        );
      })}
    </select>
  );
};
