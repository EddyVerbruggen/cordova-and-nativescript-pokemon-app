import { SegmentedBarItem } from "ui/segmented-bar";
import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { topmost } from "tns-core-modules/ui/frame";
import { connectionType, startMonitoring } from "tns-core-modules/connectivity";
import { Pokemon } from "~/model/pokemon";

const pokemonService = require("../pokemon-data/pokemon-data-service");

export class HomeViewModel extends Observable {
    segmentedBarItems: Array<SegmentedBarItem>;
    selectedBarIndex: number = 0;

    pokemon: ObservableArray<Pokemon>;
    pokemonData: Array<Pokemon>;

    offline: boolean;

    constructor() {
        super();

        this.segmentedBarItems = this.getSegmentedBarItems();

        pokemonService.getPokemonList().then(data => {
            this.pokemonData = data;
            this.sort(true);
        });

        // monitor network connection
        startMonitoring(newConnectionType => this.set("offline", newConnectionType === connectionType.none));
    };

    onSortOrderChanged(args): void {
        if (this.pokemonData) {
            this.sort(args.newIndex === 0);
        }
    }

    onPokemonTap(args): void {
        topmost().navigate({
            moduleName: "pokemon-detail-page/pokemon-detail-page",
            context: this.pokemonData[args.index],
            animated: true,
            transition: {
                name: "slide",
                duration: 300
            }
        });
    }

    private sort(asc: boolean): void {
        this.pokemonData.sort((a, b) => a.name > b.name ? (asc ? 1 : -1) : (asc ? -1 : 1));
        this.set("pokemon", new ObservableArray(this.pokemonData));
    }

    private getSegmentedBarItems = () => {
        let segmentedBarItem1 = new SegmentedBarItem();
        segmentedBarItem1.title = "A - Z";

        let segmentedBarItem2 = new SegmentedBarItem();
        segmentedBarItem2.title = "Z - A";

        return [segmentedBarItem1, segmentedBarItem2];
    }
}
