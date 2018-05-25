const observableModule = require("tns-core-modules/data/observable");

function PokemonDetailViewModel(pokemon) {
  return observableModule.fromObject({
    pokemon
  });
}

module.exports = PokemonDetailViewModel;
