# Programme de Gestion de Graphe

Ce projet permet de gérer des graphes à l'aide de différentes fonctionnalités telles que la création de graphes, l'ajout ou la suppression d'arêtes, et l'exécution de l'algorithme de Dijkstra.

## Prérequis

- Node.js installé sur votre machine

## Installation

1. Clonez le dépôt :

    ```bash
    git clone <URL-du-dépôt>
    cd <nom-du-dépôt>
    ```

2. Installez les dépendances (si nécessaire) :

    ```bash
    npm install
    ```

## Utilisation

### Exécution du programme

Pour exécuter le programme, utilisez la commande suivante :

```bash
npx ts-node <nom-du-fichier>.ts
```

## Menu Principal
Le programme affiche un menu principal avec plusieurs options. Voici les options disponibles et leur description :

1. Charger un graphe depuis un fichier : Permet de charger un graphe à partir d'un fichier spécifié.
2. Créer un graphe manuellement : Permet de créer un graphe en ajoutant des arêtes manuellement.
3. Ajouter une arête : Ajoute une arête au graphe existant.
4. Supprimer une arête : Supprime une arête du graphe existant.
5. Modifier une arête : Modifie le poids d'une arête existante.
6. Afficher la liste d'adjacence : Affiche la liste d'adjacence du graphe.
7.Afficher la matrice d'adjacence : Affiche la matrice d'adjacence du graphe.
8. Redimensionner le graphe (ajouter ou enlever des sommets) : Ajoute ou enlève des sommets au graphe.
9. Exécuter l'algorithme de Dijkstra : Exécute l'algorithme de Dijkstra à partir d'un sommet donné.
10. Récupérer les voisins d'un sommet : Affiche les voisins d'un sommet donné.
11. Récupérer les successeurs d'un sommet : Affiche les successeurs d'un sommet donné.
12. Récupérer les prédécesseurs d'un sommet : Affiche les prédécesseurs d'un sommet donné.
13. Récupérer le poids d'un arc (i, j) : Affiche le poids de l'arc entre deux sommets donnés.
14. Récupérer le nombre de sommets : Affiche le nombre total de sommets dans le graphe.
15. Récupérer le nombre d'arcs : Affiche le nombre total d'arcs dans le graphe.
16. Tester si un arc (i, j) existe dans le graphe : Vérifie l'existence d'un arc entre deux sommets donnés.
17. Quitter : Quitte le programme.

##Instructions pour chaque option

### Charger un graphe depuis un fichier
Entrez le chemin complet du fichier contenant le graphe à charger.

### Créer un graphe manuellement
Entrez les sommets source et destination ainsi que le poids de chaque arête. Vous pouvez continuer à ajouter des arêtes jusqu'à ce que vous choisissiez de terminer.

### Ajouter/Supprimer/Modifier une arête
Pour ajouter, supprimer ou modifier une arête, entrez les sommets source et destination, et (le cas échéant) le poids de l'arête.

### Afficher la liste d'adjacence / Afficher la matrice d'adjacence
Ces options affichent respectivement la liste et la matrice d'adjacence du graphe actuel.

### Redimensionner le graphe
Choisissez si vous souhaitez ajouter ou enlever des sommets, puis entrez le nombre de sommets à ajouter ou enlever.

### Exécuter l'algorithme de Dijkstra
Entrez le sommet de départ pour exécuter l'algorithme de Dijkstra.

### Récupérer les voisins/successeurs/prédécesseurs d'un sommet
Entrez le sommet pour obtenir les voisins, successeurs ou prédécesseurs.

### Récupérer le poids d'un arc (i, j)
Entrez les sommets source et destination pour obtenir le poids de l'arc entre eux.

### Récupérer le nombre de sommets / arcs
Affiche le nombre total de sommets ou d'arcs dans le graphe.

### Tester si un arc (i, j) existe
Entrez les sommets source et destination pour vérifier l'existence d'un arc entre eux.

### Quitter
Permet de quitter le programme. Si un graphe a été créé manuellement, il est possible de sauvegarder les modifications avant de quitter.

## Auteurs
- SIARATH Noa, PAGES Guillaume
