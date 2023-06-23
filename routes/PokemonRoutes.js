const express = require('express');
const router = express.Router();
const Pokemon = require('../models/PokemonModel');

/*
    TODO: 
    get list of all pokemons                    ok
    get a rate-limited number of pokemons       ok
    get a pokemon given a name                  ok
    get all pokemons that match a type          ok
*/
  
router.get( `/`, ( request, response ) => {
    const requestProperty = Object.keys(request.query)[0]; // request property
    let filteredPokemons;

    if (requestProperty == 'limit'){
            //query with limit and offset
            //TEST URL: http://localhost:8006/api/v1/pokemons?limit=20&offset=0
        let limit = parseInt(request.query[requestProperty]);
        let offset = parseInt(request.query[Object.keys(request.query)[1]]);
        Pokemon.find().then(res => {
            filteredPokemons = res.slice(offset, offset+(limit));
            response.status( 200 ).send( { pokemons : filteredPokemons } );
        }).catch(error => {
            response.status( 400 ).send( { error: error } );
        });

    } else {
            // GET all pokemons
            // TEST URL: http://localhost:8006/api/v1/pokemons/ 
        Pokemon.find().then( res => {
            response.status( 200 ).send( { pokemons : res } );
        });
    };
});

router.get( `/search`, ( request, response ) => {
    const requestProperty = Object.keys(request.query)[0];
    const queryRequest = request.query[requestProperty];
    let filteredPokemons = []; 
 
    if(requestProperty === "type") {
            // type query
            // TEST URL: http://localhost:8006/api/v1/pokemons/search?type=Fire
        Pokemon.find({type: queryRequest }).then(res => {
            filteredPokemons = res;
            response.status( 200 ).send( { pokemons : filteredPokemons } );
        });
    } else if (requestProperty === "name"){
            // name query
            // TEST URL: http://localhost:8006/api/v1/pokemons/search?name=Ivysaur
        Pokemon.find({name: queryRequest }).then(res => {
            filteredPokemons = res;
            response.status( 200 ).send( { pokemons : filteredPokemons } );
        });
    } else {
            // without query
            // TEST URL: http://localhost:8006/api/v1/pokemons/search?
        Pokemon.find().then(res => {
             response.status( 200 ).send( { pokemons : res } );
         }).catch(error => {
               response.status( 400 ).send( { error: error } );
         });
    };
});


    // TEST URL: http://localhost:8006/api/v1/pokemons/Ivysaur
router.get( `/:name`, ( request, response ) => {
    Pokemon.findOne({name: request.params.name}).then(dbResponse => {
        if (dbResponse){
            response.status(200).send( { pokemons : dbResponse } ); 
        } else {
            response.status(404).send({error: "pokemon not found"});
        };
    });    
});
    
module.exports = router;


