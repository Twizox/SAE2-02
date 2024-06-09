import Graphe from './graphe.ts';
import { dijkstra } from './Dijkstra.ts';

async function menuPrincipal() {
    console.clear();
    console.log("                                                 ");
    console.log(" ██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗███████╗");
    console.log("██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔════╝");
    console.log("██║  ███╗██████╔╝███████║██████╔╝███████║█████╗  ");
    console.log("██║   ██║██╔══██╗██╔══██║██╔═══╝ ██╔══██║██╔══╝  ");
    console.log("╚██████╔╝██║  ██║██║  ██║██║     ██║  ██║███████╗");
    console.log(" ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝");
    console.log("                                                 ");
    console.log("Bienvenue dans le Programme de Gestion de Graphe\n");

    let graphe: Graphe | null = null;
    let creeManuellement = false;

    while (true) {
        console.clear(); // Efface la console au début de chaque itération
        console.log("Choisissez une option :");
        console.log("1. Charger un graphe depuis un fichier");
        console.log("2. Créer un graphe manuellement");
        console.log("3. Ajouter une arête");
        console.log("4. Supprimer une arête");
        console.log("5. Modifier une arête");
        console.log("6. Afficher la liste d'adjacence");
        console.log("7. Afficher la matrice d'adjacence");
        console.log("8. Redimensionner le graphe (ajouter ou enlever des sommets)");
        console.log("9. Exécuter l'algorithme de Dijkstra");
        console.log("10. Récupérer les voisins d'un sommet");
        console.log("11. Récupérer les successeurs d'un sommet");
        console.log("12. Récupérer les prédécesseurs d'un sommet");
        console.log("13. Récupérer le poids d'un arc (i, j)");
        console.log("14. Récupérer le nombre de sommets");
        console.log("15. Récupérer le nombre d'arcs");
        console.log("16. Tester si un arc (i, j) existe dans le graphe");
        console.log("0. Quitter");
        const choix = prompt("Entrez votre choix : ");

        switch (choix) {
            case "1":
                const cheminFichier = prompt("Entrez le chemin vers le fichier du graphe : ");
                try {
                    graphe = new Graphe(cheminFichier!);
                    console.log("Graphe chargé avec succès !");
                } catch (erreur) {
                    console.error("Erreur lors du chargement du fichier :", erreur);
                }
                break;
            case "2":
                graphe = new Graphe();
                creeManuellement = true;
                const sommets = new Set<number>();
                let ajouterAutre = true;
                while (ajouterAutre) {
                    const de = parseInt(prompt("Entrez le sommet source : ")!);
                    const a = parseInt(prompt("Entrez le sommet destination : ")!);
                    const poids = parseInt(prompt("Entrez le poids de l'arc : ")!);
                    graphe.ajouterArete(de, a, poids);
                    sommets.add(de);
                    sommets.add(a);
                    const autre = prompt("Ajouter un autre arc ? (oui ou non) : ");
                    ajouterAutre = autre?.toLowerCase() === "oui";
                }
                graphe.redimensionner("ajout", Math.max(...sommets) + 1); // Assurez-vous que le nombre de sommets est correct
                console.log("Graphe créé avec succès !");
                const sauvegarderGrapheCreation = prompt("Voulez-vous sauvegarder le graphe maintenant ? (oui ou non) : ");
                if (sauvegarderGrapheCreation?.toLowerCase() === "oui") {
                    const cheminSauvegardeCreation = prompt("Entrez le chemin pour sauvegarder le fichier du graphe : ");
                    graphe.sauvegarderDansFichier(cheminSauvegardeCreation!);
                    console.log("Graphe sauvegardé avec succès !");
                }
                break;
            case "3":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const deAjouter = parseInt(prompt("Entrez le sommet source : ")!);
                const aAjouter = parseInt(prompt("Entrez le sommet destination : ")!);
                const poidsAjouter = parseInt(prompt("Entrez le poids de l'arc : ")!);
                graphe.ajouterArete(deAjouter, aAjouter, poidsAjouter);
                console.log("Arête ajoutée avec succès !");
                if (!creeManuellement) {
                    const sauvegarderAjout = prompt("Voulez-vous sauvegarder les changements dans le fichier ? (oui ou non) : ");
                    if (sauvegarderAjout?.toLowerCase() === "oui") {
                        const cheminSauvegarde = prompt("Entrez le chemin pour sauvegarder le fichier du graphe : ");
                        graphe.sauvegarderDansFichier(cheminSauvegarde!);
                        console.log("Changements sauvegardés avec succès !");
                    }
                }
                break;
            case "4":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const deSupprimer = parseInt(prompt("Entrez le sommet source : ")!);
                const aSupprimer = parseInt(prompt("Entrez le sommet destination : ")!);
                graphe.supprimerArete(deSupprimer, aSupprimer);
                console.log("Arête supprimée avec succès !");
                if (!creeManuellement) {
                    const sauvegarderSuppression = prompt("Voulez-vous sauvegarder les changements dans le fichier ? (oui ou non) : ");
                    if (sauvegarderSuppression?.toLowerCase() === "oui") {
                        const cheminSauvegarde = prompt("Entrez le chemin pour sauvegarder le fichier du graphe : ");
                        graphe.sauvegarderDansFichier(cheminSauvegarde!);
                        console.log("Changements sauvegardés avec succès !");
                    }
                }
                break;
            case "5":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const deModifier = parseInt(prompt("Entrez le sommet source : ")!);
                const aModifier = parseInt(prompt("Entrez le sommet destination : ")!);
                const nouveauPoids = parseInt(prompt("Entrez le nouveau poids de l'arc : ")!);
                graphe.modifierArete(deModifier, aModifier, nouveauPoids);
                console.log("Arête modifiée avec succès !");
                if (!creeManuellement) {
                    const sauvegarderModification = prompt("Voulez-vous sauvegarder les changements dans le fichier ? (oui ou non) : ");
                    if (sauvegarderModification?.toLowerCase() === "oui") {
                        const cheminSauvegarde = prompt("Entrez le chemin pour sauvegarder le fichier du graphe : ");
                        graphe.sauvegarderDansFichier(cheminSauvegarde!);
                        console.log("Changements sauvegardés avec succès !");
                    }
                }
                break;
            case "6":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                console.log("Liste d'adjacence :");
                console.log(graphe.obtenirListeAdjacence());
                break;
            case "7":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                console.log("Matrice d'adjacence :");
                console.table(graphe.obtenirMatriceAdjacence());
                break;
            case "8":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const action = prompt("Voulez-vous ajouter ou enlever des sommets ? (ajout/retrait) : ")!.toLowerCase();
                const nbSom = parseInt(prompt("Entrez le nombre de sommets : ")!);
                if (action === "ajout" || action === "retrait") {
                    graphe.redimensionner(action as "ajout" | "retrait", nbSom);
                    const cheminSauvegarde = prompt("Entrez le chemin pour sauvegarder le fichier du graphe : ");
                    graphe.sauvegarderDansFichier(cheminSauvegarde!);
                    console.log("Graphe redimensionné et sauvegardé avec succès !");
                } else {
                    console.log("Action non reconnue. Veuillez entrer 'ajout' ou 'retrait'.");
                }
                break;
            case "9":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const sommetDepart = parseInt(prompt("Entrez le sommet de départ pour l'algorithme de Dijkstra : ")!);
                const resultat = dijkstra(graphe, sommetDepart);
                console.log('Distances :', resultat.distances);
                console.log('Prédécesseurs :', resultat.predecesseurs);
                break;
            case "10":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const sommetVoisins = parseInt(prompt("Entrez le sommet pour obtenir les voisins : ")!);
                const voisins = graphe.obtenirVoisins(sommetVoisins);
                console.log(`Voisins du sommet ${sommetVoisins} :`, voisins);
                break;
            case "11":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const sommetSuccesseurs = parseInt(prompt("Entrez le sommet pour obtenir les successeurs : ")!);
                const successeurs = graphe.obtenirSuccesseurs(sommetSuccesseurs);
                console.log(`Successeurs du sommet ${sommetSuccesseurs} :`, successeurs);
                break;
            case "12":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const sommetPredecesseurs = parseInt(prompt("Entrez le sommet pour obtenir les prédécesseurs : ")!);
                const predecesseurs = graphe.obtenirPredecesseurs(sommetPredecesseurs);
                console.log(`Prédécesseurs du sommet ${sommetPredecesseurs} :`, predecesseurs);
                break;
            case "13":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const sommetSourcePoids = parseInt(prompt("Entrez le sommet source : ")!);
                const sommetDestPoids = parseInt(prompt("Entrez le sommet destination : ")!);
                const poidsArete = graphe.obtenirPoidsArete(sommetSourcePoids, sommetDestPoids);
                console.log(`Poids de l'arc (${sommetSourcePoids}, ${sommetDestPoids}) :`, poidsArete);
                break;
            case "14":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const nbSommets = graphe.obtenirNbSommets();
                console.log(`Nombre de sommets :`, nbSommets);
                break;
            case "15":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const nbAretes = graphe.obtenirNbAretes();
                console.log(`Nombre d'arcs :`, nbAretes);
                break;
            case "16":
                if (!graphe) {
                    console.log("Veuillez d'abord charger ou créer un graphe.");
                    break;
                }
                const sommetSourceTest = parseInt(prompt("Entrez le sommet source : ")!);
                const sommetDestTest = parseInt(prompt("Entrez le sommet destination : ")!);
                const arcExiste = graphe.arcExiste(sommetSourceTest, sommetDestTest);
                console.log(`L'arc (${sommetSourceTest}, ${sommetDestTest}) existe :`, arcExiste);
                break;
            case "0":
                if (creeManuellement && graphe) {
                    const sauvegarderGraphe = prompt("Voulez-vous sauvegarder le graphe avant de quitter ? (oui ou non) : ");
                    if (sauvegarderGraphe?.toLowerCase() === "oui") {
                        const cheminSauvegarde = prompt("Entrez le chemin pour sauvegarder le fichier du graphe : ");
                        graphe.sauvegarderDansFichier(cheminSauvegarde!);
                        console.log("Graphe sauvegardé avec succès !");
                    }
                }
                console.log("Fin du programme.");
                return;
            default:
                console.log("Choix invalide.");
                break;
        }
    }
}

// Exécuter le menu principal
await menuPrincipal();
