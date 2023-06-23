import React from 'react';
import Pokedex from './pages/Pokedex';
import PokemonPage from './pages/PokemonPage';
import PokemonTypePage from './pages/PokemonTypePage';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Pokedex /> } />
        <Route path='/pokemon/:pokemonName' element={<PokemonPage />} />
        <Route path='/pokemon/type/:pokemonType' element={<PokemonTypePage />} />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </>
  )
};

export default App;