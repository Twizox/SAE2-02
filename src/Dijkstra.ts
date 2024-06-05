import Graphe from './graphe.ts';

interface Resultat {
    distances: Map<number, number>;
    predecesseurs: Map<number, number>;
}

function dijkstra(graphe: Graphe, sommetDepart: number): Resultat {
    const distances = new Map<number, number>();
    const predecesseurs = new Map<number, number>();
    const nonVisites = new Set<number>();

    for (let i = 0; i < graphe.obtenirNbSommets(); i++) {
        distances.set(i, Infinity);
        nonVisites.add(i);
    }

    distances.set(sommetDepart, 0);

    while (nonVisites.size > 0) {
        let sommetCourant: number | undefined;
        let plusPetiteDistance = Infinity;

        for (const sommet of nonVisites) {
            const distance = distances.get(sommet)!;
            if (distance < plusPetiteDistance) {
                plusPetiteDistance = distance;
                sommetCourant = sommet;
            }
        }

        if (sommetCourant === undefined) {
            break;
        }

        nonVisites.delete(sommetCourant);

        const successeurs = graphe.obtenirSuccesseurs(sommetCourant);
        for (const voisin of successeurs) {
            const poidsArete = graphe.obtenirPoidsArete(sommetCourant, voisin)!;
            const distanceAlternative = distances.get(sommetCourant)! + poidsArete;
            if (distanceAlternative < distances.get(voisin)!) {
                distances.set(voisin, distanceAlternative);
                predecesseurs.set(voisin, sommetCourant);
            }
        }
    }

    return { distances, predecesseurs };
}

export { dijkstra, Resultat };