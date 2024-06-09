import { assertEquals } from "https://deno.land/std@0.220.0/assert/mod.ts";
import { assertThrows } from "https://deno.land/std@0.220.0/assert/assert_throws.ts";
import Graphe from "../src/graphe.ts";

Deno.test("Test du setter nbSommets avec une valeur valide", () => {
    const graphe = new Graphe();
    graphe.nbSommets = 5;
    assertEquals(graphe.nbSommets, 5);
});

Deno.test("Test du setter nbSommets avec une valeur invalide", () => {
    const graphe = new Graphe();
    assertThrows(() => {
        graphe.nbSommets = -1;
    }, Error, "Nombre de sommets invalide");
});

Deno.test("Test du setter nbAretes avec une valeur valide", () => {
    const graphe = new Graphe();
    graphe.nbAretes = 10;
    assertEquals(graphe.nbAretes, 10);
});

Deno.test("Test du setter nbAretes avec une valeur invalide", () => {
    const graphe = new Graphe();
    assertThrows(() => {
        graphe.nbAretes = -1;
    }, Error, "Nombre d'arêtes invalide");
});

Deno.test("Test de l'ajout d'une arête avec des sommets invalides", () => {
    const graphe = new Graphe();
    assertThrows(() => {
        graphe.ajouterArete(-1, 1, 10);
    }, Error, "Sommet source invalide");

    assertThrows(() => {
        graphe.ajouterArete(1, -1, 10);
    }, Error, "Sommet destination invalide");
});

Deno.test("Test de la suppression d'une arête inexistante", () => {
    const graphe = new Graphe();
    assertThrows(() => {
        graphe.supprimerArete(0, 1);
    }, Error, "Arête inexistante");
});



Deno.test("Test de redimensionner avec un nombre de sommets négatif", () => {
    const graphe = new Graphe();
    assertThrows(() => {
        graphe.redimensionner("ajout", -1);
    }, Error, "Nombre de sommets invalide");

    assertThrows(() => {
        graphe.redimensionner("retrait", -1);
    }, Error, "Nombre de sommets invalide");
});

Deno.test("Test de la méthode obtenirNbSommets", () => {
    const graphe = new Graphe();
    graphe.redimensionner("ajout", 5);
    assertEquals(graphe.obtenirNbSommets(), 5);
});

Deno.test("Test de la méthode obtenirNbAretes", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 10);
    graphe.ajouterArete(1, 2, 20);
    assertEquals(graphe.obtenirNbAretes(), 2);
});

Deno.test("Test de la méthode ajouterArete", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 10);
    assertEquals(graphe.arcExiste(0, 1), true);
    assertEquals(graphe.obtenirPoidsArete(0, 1), 10);
});

Deno.test("Test de la méthode supprimerArete", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 10);
    graphe.supprimerArete(0, 1);
    assertEquals(graphe.arcExiste(0, 1), false);
});

Deno.test("Test de la méthode modifierArete", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 10);
    graphe.modifierArete(0, 1, 20);
    assertEquals(graphe.obtenirPoidsArete(0, 1), 20);
});

Deno.test("Test de la méthode obtenirPoidsArete", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 10);
    assertEquals(graphe.obtenirPoidsArete(0, 1), 10);
});

Deno.test("Test de la méthode obtenirSuccesseurs", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 10);
    graphe.ajouterArete(0, 2, 20);
    assertEquals(graphe.obtenirSuccesseurs(0), [1, 2]);
});

Deno.test("Test de la méthode obtenirPredecesseurs", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(1, 0, 10);
    graphe.ajouterArete(2, 0, 20);
    assertEquals(graphe.obtenirPredecesseurs(0), [1, 2]);
});

Deno.test("Test de la méthode obtenirVoisins", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 10);
    graphe.ajouterArete(2, 0, 20);
    assertEquals(graphe.obtenirVoisins(0), [1, 2]);
});

Deno.test("Test de la méthode redimensionner ajout", () => {
    const graphe = new Graphe();
    graphe.redimensionner("ajout", 3);
    assertEquals(graphe.obtenirNbSommets(), 3);
});

Deno.test("Test de la méthode redimensionner retrait", () => {
    const graphe = new Graphe();
    graphe.redimensionner("ajout", 5);
    graphe.redimensionner("retrait", 2);
    assertEquals(graphe.obtenirNbSommets(), 3);
});

Deno.test("Test de la méthode arcExiste", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 10);
    assertEquals(graphe.arcExiste(0, 1), true);
    assertEquals(graphe.arcExiste(1, 0), false);
});
