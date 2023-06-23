import React, { useEffect } from 'react';
import './PokemonPage.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PokemonPage = () => {
    const [pokemonData, setPokemonData ] = useState({name: "", img: "", type: [], misc:{classification:""}});
    const {pokemonName} = useParams();

    useEffect(() => {
        const getPokemon =  () => {
            axios.get(`http://localhost:8006/api/v1/pokemons/${pokemonName}`).then(response => {
                setPokemonData(response.data.pokemons); 
            }).catch(error => {
                console.log(`Error: ${error}`);
            });
        };
        getPokemon();
    }, []);
    
    return (
    <>
        <Link to={'/'}>
            <h3>return to main page</h3>
        </Link>
    
        <div className='PokemonPage__container'>
            <div className='PokemonPage__image'>
                <img src={pokemonData.img}/>
            </div>
            <div className='PokemonPage__info'>
                <h1>{pokemonData.name}</h1>
                <div> Type:</div>
                <div>
                        {
                        pokemonData.type.map(type => 
                            <Link to={`/pokemon/type/${type}`}>
                                <small>-{type}-</small>
                            </Link>
                        )
                        }
                </div>
                <div>Classification: {pokemonData.misc.classification}</div>
            </div>
        </div>
    </>
  )
};

export default PokemonPage;