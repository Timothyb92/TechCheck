//Match DB character numbers with characters in official list
//https://www.streetfighter.com/6/character

//Official URL for character photo is:
// https://www.streetfighter.com/6/assets/images/character/select_character1_over.png
//Can replace character number with call to db with selected character
import './characterImage.styles.css';

interface CharacterImageProps {
  characterId: number;
}

export const CharacterImage = ({ characterId }: CharacterImageProps) => {
  return (
    <div className="character-image-container">
      <img
        src={`https://www.streetfighter.com/6/assets/images/character/select_character${characterId}_over.png`}
        alt=""
        className="character-image"
      />
    </div>
  );
};
