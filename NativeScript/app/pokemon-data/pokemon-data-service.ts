import { knownFolders } from "tns-core-modules/file-system";
import { Pokemon } from "../model/pokemon";

exports.getPokemonList = (): Promise<Array<Pokemon>> => {
    const file = knownFolders.currentApp().getFile("pokemon-data/pokemon.json");

    return new Promise((resolve, reject) => {
        file.readText()
            .then(content => resolve(JSON.parse(content)))
            .catch(err => reject(err));
    });
};