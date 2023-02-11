import React from 'react';

function CharacterSelect({ onSelect }) {
  const characterTypes = [{
    name: 'red',
  }, {
    name: 'green',
  }, {
    name: 'purple',
  }, {
    name: 'blue',
  }];
  return (
    <>
      <h2 className="selectTitle flipOnPortrait">Select your gnome</h2>
      <div className="selectContainer">
        <div className="switcher">
          {characterTypes.map((character) => (
            <button
              type="button"
              key={character.name}
              className={`characterType ${character.name}`}
              onClick={() => {
                document.documentElement.requestFullscreen();
                onSelect(character);
              }}
            >
              {character.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CharacterSelect;
