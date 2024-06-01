import { readFileSync, writeFileSync } from "node:fs";

class Graphe {
    private listeAdjacence: Map<number, Map<number, number>>;
    private nbSommets: number;
    private nbAretes: number;

    constructor(cheminFichier?: string) {
        this.listeAdjacence = new Map<number, Map<number, number>>();
        this.nbSommets = 0;
        this.nbAretes = 0;

        if (cheminFichier) {
            this.chargerDepuisFichier(cheminFichier);
        }
    }

    chargerDepuisFichier(cheminFichier: string): void {
        try {
            const contenu = new TextDecoder("utf-8").decode(readFileSync(cheminFichier));
            const lignes = contenu.split('\n');
            const [sommets, aretes] = lignes[0].split(' ').map(Number);
            this.nbSommets = sommets;
            this.nbAretes = aretes;
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
                this.nbAretes--;
            }
        }
    }
    ajouterArête(de: number, à: number, poids: number): void {
        if (!this.listeAdjacence.has(de)) {
            this.listeAdjacence.set(de, new Map<number, number>());
        }
        this.listeAdjacence.get(de)!.set(à, poids);
        this.nbAretes++;
    }
    public obtenirNbSommets(): number {
        return this.nbSommets;
    }
    
    public obtenirNbAretes(): number {
        return this.nbAretes;
    }
    
    public obtenirSuccesseurs(sommet: number): number[] {
        return Array.from(this.listeAdjacence.get(sommet)?.keys() || []);
    }
    
    public obtenirPredecesseurs(sommet: number): number[] {
        const predecesseurs: number[] = [];
        for (const [de, voisins] of this.listeAdjacence.entries()) {
            if (voisins.has(sommet)) {
                predecesseurs.push(de);
            }
        }
        return predecesseurs;
    }
  
    
}



export default Graphe;
