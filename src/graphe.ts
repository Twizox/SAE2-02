import { readFileSync, writeFileSync } from "node:fs";

class Graphe {
    private listeAdjacence: Map<number, Map<number, number>>;
    private matriceAdjacence: number[][];
    private estListeAdjacence: boolean;
    private nbSommets: number;
    private nbAretes: number;

    constructor();
    constructor(cheminFichier: string);
    constructor(cheminFichier?: string) {
        this.listeAdjacence = new Map<number, Map<number, number>>();
        this.matriceAdjacence = [];
        this.nbSommets = 0;
        this.nbAretes = 0;
        this.estListeAdjacence = true;

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

    redimensionner(nbSommets: number): void {
        this.nbSommets = nbSommets;
        if (!this.estListeAdjacence) {
            this.matriceAdjacence = Array.from({ length: nbSommets }, () => Array(nbSommets).fill(Infinity));
            for (let i = 0; i < nbSommets; i++) {
                this.matriceAdjacence[i][i] = 0;
            }
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
    
    aArête(de: number, à: number): boolean {
        return this.listeAdjacence.has(de) && this.listeAdjacence.get(de)!.has(à);
    }

    obtenirNbSommets(): number {
        return this.nbSommets;
    }
    
    obtenirNbAretes(): number {
        return this.nbAretes;
    }
    
    obtenirSuccesseurs(sommet: number): number[] {
        return Array.from(this.listeAdjacence.get(sommet)?.keys() || []);
    }
    
    obtenirPredecesseurs(sommet: number): number[] {
        const predecesseurs: number[] = [];
        for (const [de, voisins] of this.listeAdjacence.entries()) {
            if (voisins.has(sommet)) {
                predecesseurs.push(de);
            }
        }
        return predecesseurs;
    }

    obtenirVoisins(sommet: number): number[] {
        const successeurs = this.obtenirSuccesseurs(sommet);
        const prédécesseurs = this.obtenirPredecesseurs(sommet);
        return Array.from(new Set([...successeurs, ...prédécesseurs]));
    }
  
    
}



export default Graphe;
