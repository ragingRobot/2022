import React, { useState } from 'react';
import Controller from './Controller';
import CharacterSelect from './CharacterSelect';
import './app.css';

function Switcher() {
    const [character, setCharacter] = useState(null);
    return !character ? <CharacterSelect onSelect={setCharacter} /> : <Controller character={character} />;
}

export default Switcher;
