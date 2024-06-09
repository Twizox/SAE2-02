import { readFileSync, writeFileSync } from "node:fs";

class Graphe {
  private listeAdjacence: Map<number, Map<number, number>>;
  private matriceAdjacence: number[][];
  private estListeAdjacence: boolean;
  private _nbSommets: number; // Renommé pour utiliser avec getters et setters
  private _nbArêtes: number; // Renommé pour utiliser avec getters et setters

  constructor();
  constructor(cheminFichier: string);
  constructor(cheminFichier?: string) {
    this.listeAdjacence = new Map<number, Map<number, number>>();
    this.matriceAdjacence = [];
    this._nbSommets = 0;
    this._nbArêtes = 0;
    this.estListeAdjacence = true;

    if (cheminFichier) {
      this.chargerDepuisFichier(cheminFichier);
    }
  }

  get nbSommets(): number {
    return this._nbSommets;
  }

  set nbSommets(value: number) {
    if (value < 0) {
      throw new Error("Nombre de sommets invalide");
    }
    this._nbSommets = value;
  }

  get nbAretes(): number {
    return this._nbArêtes;
  }

  set nbAretes(value: number) {
    if (value < 0) {
      throw new Error("Nombre d'arêtes invalide");
    }
    this._nbArêtes = value;
  }

  private chargerDepuisFichier(cheminFichier: string): void {
    try {
      const contenu = new TextDecoder("utf-8").decode(
        readFileSync(cheminFichier)
      );
      const lignes = contenu
        .split("\n")
        .map((ligne) => ligne.trim())
        .filter((ligne) => ligne.length > 0);

      // Détecter le type de représentation
      if (lignes[0].includes(" ")) {
        // Supposons que c'est une liste d'adjacence
        this.estListeAdjacence = true;
        const [sommets, arêtes] = lignes[0].split(" ").map(Number);
        this.nbSommets = sommets;
        this.nbAretes = arêtes;
        lignes.slice(1).forEach((ligne) => {
          const [de, à, poids] = ligne.split(" ").map(Number);
          this.ajouterArete(de, à, poids);
        });
      } else {
        // Supposons que c'est une matrice d'adjacence
        this.estListeAdjacence = false;
        this.nbSommets = lignes.length;
        this.nbAretes = 0;
        this.matriceAdjacence = lignes.map((ligne) =>
          ligne.split(" ").map(Number)
        );
        for (let i = 0; i < this.nbSommets; i++) {
          for (let j = 0; j < this.nbSommets; j++) {
            if (
              this.matriceAdjacence[i][j] !== 0 &&
              this.matriceAdjacence[i][j] !== Infinity
            ) {
              this.nbAretes++;
            }
          }
        }
      }
    } catch (erreur) {
      console.error("Erreur lors de la lecture du fichier :", erreur);
    }
  }

  public redimensionner(action: "ajout" | "retrait", nbSommets: number): void {
    if (nbSommets < 0) {
      throw new Error("Nombre de sommets invalide");
    }
    if (action === "ajout") {
      // Ajouter des sommets
      const nouveauNbSommets = this.nbSommets + nbSommets;
      if (this.estListeAdjacence) {
        for (let i = this.nbSommets; i < nouveauNbSommets; i++) {
          this.listeAdjacence.set(i, new Map<number, number>());
        }
      } else {
        const ancienneMatrice = this.matriceAdjacence;
        this.matriceAdjacence = Array.from(
          { length: nouveauNbSommets },
          (_, i) =>
            i < ancienneMatrice.length
              ? [
                  ...ancienneMatrice[i],
                  ...Array(nouveauNbSommets - ancienneMatrice.length).fill(
                    Infinity
                  ),
                ]
              : Array(nouveauNbSommets).fill(Infinity)
        );
        for (let i = this.nbSommets; i < nouveauNbSommets; i++) {
          this.matriceAdjacence[i][i] = 0;
        }
      }
      this.nbSommets = nouveauNbSommets;
    } else if (action === "retrait") {
      // Enlever des sommets
      const nouveauNbSommets = this.nbSommets - nbSommets;
      if (this.estListeAdjacence) {
        for (let i = this.nbSommets - 1; i >= nouveauNbSommets; i--) {
          this.listeAdjacence.delete(i);
        }
      } else {
        this.matriceAdjacence = this.matriceAdjacence
          .slice(0, nouveauNbSommets)
          .map((row) => row.slice(0, nouveauNbSommets));
      }
      this.nbSommets = nouveauNbSommets;
    }
  }

  public  obtenirNbSommets(): number {
    return this.nbSommets;
  }

  public obtenirNbAretes(): number {
    return this.nbAretes;
  }

  public  ajouterArete(de: number, à: number, poids: number): void {
    if (de < 0) {
      throw new Error("Sommet source invalide");
    }
    if (à < 0) {
      throw new Error("Sommet destination invalide");
    }
    if (this.estListeAdjacence) {
      if (!this.listeAdjacence.has(de)) {
        this.listeAdjacence.set(de, new Map<number, number>());
      }
      this.listeAdjacence.get(de)!.set(à, poids);
      this.nbAretes++;
      this.nbSommets = Math.max(this.nbSommets, de + 1, à + 1);
    } else {
      this.matriceAdjacence[de][à] = poids;
      this.nbAretes++;
      this.nbSommets = Math.max(this.nbSommets, de + 1, à + 1);
    }
  }

  public supprimerArete(de: number, à: number): void {
    if (de < 0 || à < 0) {
      throw new Error("Sommet invalide");
    }
    if (this.estListeAdjacence) {
      if (this.listeAdjacence.has(de) && this.listeAdjacence.get(de)!.has(à)) {
        const voisins = this.listeAdjacence.get(de)!;
        voisins.delete(à);
        this.nbAretes--;
        if (voisins.size === 0) {
          this.listeAdjacence.delete(de);
        }
      } else {
        throw new Error("Arête inexistante");
      }
    } else {
      if (
        de >= this.nbSommets ||
        à >= this.nbSommets ||
        this.matriceAdjacence[de][à] === Infinity
      ) {
        throw new Error("Arête inexistante");
      }
      this.matriceAdjacence[de][à] = Infinity;
      this.nbAretes--;
    }
  }

  public  modifierArete(de: number, à: number, nouveauPoids: number): void {
    if (de < 0 || à < 0) {
      throw new Error("Sommet invalide");
    }
    if (this.estListeAdjacence) {
      if (this.listeAdjacence.has(de) && this.listeAdjacence.get(de)!.has(à)) {
        this.listeAdjacence.get(de)!.set(à, nouveauPoids);
      } else {
        throw new Error("Arête non trouvée");
      }
    } else {
      if (
        de >= this.nbSommets ||
        à >= this.nbSommets ||
        this.matriceAdjacence[de][à] === Infinity
      ) {
        throw new Error("Arête non trouvée");
      }
      this.matriceAdjacence[de][à] = nouveauPoids;
    }
  }

  public obtenirListeAdjacence(): Map<number, Map<number, number>> {
    return this.listeAdjacence;
  }

  public obtenirMatriceAdjacence(): number[][] {
    if (this.estListeAdjacence) {
      const matrice: number[][] = Array.from({ length: this.nbSommets }, () =>
        Array(this.nbSommets).fill(Infinity)
      );
      for (let i = 0; i < this.nbSommets; i++) {
        matrice[i][i] = 0;
      }
      for (const [de, voisins] of this.listeAdjacence.entries()) {
        for (const [à, poids] of voisins.entries()) {
          matrice[de][à] = poids;
        }
      }
      return matrice;
    } else {
      return this.matriceAdjacence;
    }
  }

  public obtenirPoidsArete(de: number, à: number): number | undefined {
    if (de < 0 || à < 0) {
      throw new Error("Sommet invalide");
    }
    if (this.estListeAdjacence) {
      return this.listeAdjacence.get(de)?.get(à);
    } else {
      return this.matriceAdjacence[de][à];
    }
  }

  public obtenirSuccesseurs(sommet: number): number[] {
    if (sommet < 0) {
      throw new Error("Sommet invalide");
    }
    if (this.estListeAdjacence) {
      return Array.from(this.listeAdjacence.get(sommet)?.keys() || []);
    } else {
      const successeurs: number[] = [];
      for (let i = 0; i < this.nbSommets; i++) {
        if (
          this.matriceAdjacence[sommet][i] !== Infinity &&
          this.matriceAdjacence[sommet][i] !== 0
        ) {
          successeurs.push(i);
        }
      }
      return successeurs;
    }
  }

  public obtenirPredecesseurs(sommet: number): number[] {
    if (sommet < 0) {
      throw new Error("Sommet invalide");
    }
    if (this.estListeAdjacence) {
      const prédécesseurs: number[] = [];
      for (const [de, voisins] of this.listeAdjacence.entries()) {
        if (voisins.has(sommet)) {
          prédécesseurs.push(de);
        }
      }
      return prédécesseurs;
    } else {
      const prédécesseurs: number[] = [];
      for (let i = 0; i < this.nbSommets; i++) {
        if (
          this.matriceAdjacence[i][sommet] !== Infinity &&
          this.matriceAdjacence[i][sommet] !== 0
        ) {
          prédécesseurs.push(i);
        }
      }
      return prédécesseurs;
    }
  }

  public obtenirVoisins(sommet: number): number[] {
    if (sommet < 0) {
      throw new Error("Sommet invalide");
    }
    const successeurs = this.obtenirSuccesseurs(sommet);
    const prédécesseurs = this.obtenirPredecesseurs(sommet);
    return Array.from(new Set([...successeurs, ...prédécesseurs]));
  }

  public sauvegarderDansFichier(cheminFichier: string): void {
    try {
      if (this.estListeAdjacence) {
        const lignes: string[] = [`${this.nbSommets} ${this.nbAretes}`];
        for (const [de, voisins] of this.listeAdjacence.entries()) {
          for (const [à, poids] of voisins.entries()) {
            lignes.push(`${de} ${à} ${poids}`);
          }
        }
        writeFileSync(cheminFichier, lignes.join("\n"));
      } else {
        const lignes: string[] = this.matriceAdjacence.map((ligne) =>
          ligne.join(" ")
        );
        writeFileSync(cheminFichier, lignes.join("\n"));
      }
    } catch (erreur) {
      console.error("Erreur lors de l'écriture du fichier :", erreur);
    }
  }

  public arcExiste(source: number, dest: number): boolean {
    if (source < 0 || dest < 0) {
      throw new Error("Sommet invalide");
    }
    if (this.estListeAdjacence) {
      return this.listeAdjacence.get(source)?.has(dest) || false;
    } else {
      return this.matriceAdjacence[source][dest] !== Infinity;
    }
  }
}

export default Graphe;
