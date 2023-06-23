import PokedexCard from "../components/PokedexCard";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Pokedex.css";
import { Link } from "react-router-dom";

function Pokedex() {
  const URL = "https://express-api-pokedex.onrender.com";
  const [loadMore, setLoadMore] = useState(
    `${URL}/api/v1/pokemons?limit=20&offset=0`
  );
  const [pokemonObject, setPokemonObject] = useState([]); // array of pokemons
  const [offset, setOffset] = useState(20);

  // fetch data of each pokemon and add them in an array (pokemonObject)
  function createPokemonObject(dataResults) {
    dataResults.map((res) => {
      setPokemonObject((pokemonObject) => [...pokemonObject, res]);
    });
  }

  // fetch 20 pokemons
  const getPokemonObject = () => {
    axios
      .get(loadMore)
      .then((response) => {
        setOffset(offset + 20);
        setLoadMore(`${URL}/api/v1/pokemons?limit=20&offset=${offset}`);
        createPokemonObject(response.data.pokemons);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getPokemonObject();
  }, []);

  return (
    <div className="cardContainer">
      <div className="header">
        <h1>POKEDEX</h1>
      </div>
      <div className="allPokemons">
        {pokemonObject.map((pokemonData) => (
          <Link to={`/pokemon/${pokemonData.name}`}>
            <PokedexCard
              key={pokemonData.id}
              url={pokemonData.img}
              name={pokemonData.name}
              type={pokemonData.type}
              className="pokemonCard"
            />
          </Link>
        ))}
      </div>
      <div className="loadButton">
        <button onClick={() => getPokemonObject()}>Load More</button>
      </div>
    </div>
  );
}

export default Pokedex;
