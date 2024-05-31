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
    public supprimerArête(de: number, à: number): void {
        if (this.listeAdjacence.has(de)) {
            const voisins = this.listeAdjacence.get(de)!;
            if (voisins.has(à)) {
                voisins.delete(à);
                this.nbArêtes--;
            }
        }
    }
    ajouterArête(de: number, à: number, poids: number): void {
        if (!this.listeAdjacence.has(de)) {
            this.listeAdjacence.set(de, new Map<number, number>());
        }
        this.listeAdjacence.get(de)!.set(à, poids);
        this.nbArêtes++;
    }
    
}



export default Graphe;
