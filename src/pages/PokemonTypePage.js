import PokedexCard from "../components/PokedexCard";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Pokedex.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Pokedex() {
  const URL = "https://express-api-pokedex.onrender.com";
  const [pokemonObject, setPokemonObject] = useState([]); // array of pokemons
  const { pokemonType } = useParams();

  // fetch data of each pokemon and add them in an array (pokemonObject)
  function createPokemonObject(dataResults) {
    dataResults.map((res) => {
      setPokemonObject((pokemonObject) => [...pokemonObject, res]);
    });
  }

  // fetch 20 pokemons
  const getPokemonObject = () => {
    axios
      .get(`${URL}/api/v1/pokemons/search?type=${pokemonType}`)
      .then((response) => {
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
        <h1>POKEMON TYPE -- {pokemonType}</h1>
      </div>
      <div className="PokemonTypePage__link">
        <Link to={"/"}>
          <h3>return to main page</h3>
        </Link>
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
    </div>
  );
}

export default Pokedex;
