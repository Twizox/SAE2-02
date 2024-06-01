import { readFileSync, writeFileSync } from "node:fs";

class Graphe {
    private listeAdjacence: Map<number, Map<number, number>>;
    private nbSommets: number;
    private nbArêtes: number;

    constructor(cheminFichier?: string) {
        this.listeAdjacence = new Map<number, Map<number, number>>();
        this.nbSommets = 0;
        this.nbArêtes = 0;

        if (cheminFichier) {
            this.chargerDepuisFichier(cheminFichier);
        }
    }

    chargerDepuisFichier(cheminFichier: string): void {
        try {
            const contenu = new TextDecoder("utf-8").decode(readFileSync(cheminFichier));
            const lignes = contenu.split('\n');
            const [sommets, arêtes] = lignes[0].split(' ').map(Number);
            this.nbSommets = sommets;
            this.nbArêtes = arêtes;
            lignes.slice(1).forEach(ligne => {
                if (ligne.trim() !== "") {
                    const [de, à, poids] = ligne.split(' ').map(Number);
                    this.ajouterArête(de, à, poids);
                }
            });
        } catch (erreur) {
            console.error("Erreur lors de la lecture du fichier :", erreur);
        }
    }

    supprimerArête(de: number, à: number): void {
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
