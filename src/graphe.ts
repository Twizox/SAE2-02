import { readFileSync, writeFileSync } from "node:fs";

class Graphe {
    private listeAdjacence: Map<number, Map<number, number>>;
    private nbSommets: number;
    private nbArêtes: number;

    constructor() {
        this.listeAdjacence = new Map<number, Map<number, number>>();
        this.nbSommets = 0;
        this.nbArêtes = 0;
    }
}

export default Graphe;
