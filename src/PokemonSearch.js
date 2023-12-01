import React, { useState } from 'react';
import './App.css';

function PokemonSearch() {
  const [pokemonID, setPokemonID] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemonData = async () => {
    try {
      if (!pokemonID.trim()) {
        return;
      }

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
      const data = await response.json();

      setPokemonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Find The Pokemon By ID</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Pokemon ID ex:1"
          value={pokemonID}
          onChange={(e) => setPokemonID(e.target.value)}
        />
        <button onClick={fetchPokemonData}>Search</button>
      </div>
      {pokemonData && (
        <div>
          <h2>Pokemon ID: {pokemonData.id}</h2>
          <h2>Name: {pokemonData.name}</h2>
          <h2>Height: {pokemonData.height}</h2>
          <h2>Weight: {pokemonData.weight}</h2>
          <h2>Abilities: {pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</h2>
          <img src={pokemonData.sprites.front_default} alt="Pokemon" />
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;
