const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
const PORT   = 8006;

// Use our modules
server.use( bodyParser.json() ); // This solves getting the body of the request
server.use( cors() ); // Solves communication by other software

const baseURL = '/api/v1/pokemons';
const PokemonRoutes = require('./routes/PokemonRoutes.js');

mongoose.connect('mongodb://127.0.0.1:27017/pokemondb')

server.get('/', (request, response) => {
    console.log(`Online on port 8006`);
    response.send({message: 'Express server for Pokemon api'});
});

server.use( baseURL , PokemonRoutes );

server.listen( PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});
