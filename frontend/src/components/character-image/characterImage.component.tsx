//Match DB character numbers with characters in official list
//https://www.streetfighter.com/6/character

//Official URL for character photo is:
// https://www.streetfighter.com/6/assets/images/character/select_character1_over.png
//Can replace character number with call to db with selected character
import './characterImage.styles.css';

interface CharacterImageProps {
  characterId: number;
}

// !NICE TO HAVE - Take in 'color' boolean param, return colorless character image for p2 pending slot
// !colorless image avaialble at same URL, without '_over' after character ID
// !https://www.streetfighter.com/6/assets/images/character/select_character${characterId}.png

export const CharacterImage = ({ characterId }: CharacterImageProps) => {
  return (
    <div className="character-image-container">
      {characterId !== 999 ? (
        <img
          src={`https://www.streetfighter.com/6/assets/images/character/select_character${characterId}_over.png`}
          alt=""
          className="character-image"
        />
      ) : (
        <img
          src="https://cdn4.iconfinder.com/data/icons/angular-action/30/016-help-question-mark-info-detail-512.png"
          alt=""
          className="character-image"
        />
      )}
    </div>
  );
};
