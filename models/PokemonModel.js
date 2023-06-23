const mongoose = require('mongoose');

const PokemonSchema = mongoose.Schema({
    name: String,
    img: String,
    type: Array,
    stats: Object,
    damages: Object,
    misc: Object
});

module.exports = mongoose.model('Pokemon', PokemonSchema);