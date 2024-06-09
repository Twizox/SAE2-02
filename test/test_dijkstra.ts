import { assertEquals } from "https://deno.land/std@0.220.0/assert/mod.ts";
import { assertThrows } from "https://deno.land/std@0.220.0/assert/assert_throws.ts";
import Graphe from "../src/graphe.ts";
import { dijkstra } from "../src/Dijkstra.ts";

Deno.test("Test de Dijkstra avec un graphe simple", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 1);
    graphe.ajouterArete(0, 2, 4);
    graphe.ajouterArete(1, 2, 2);
    graphe.ajouterArete(2, 3, 1);
    graphe.ajouterArete(1, 3, 5);

    const resultat = dijkstra(graphe, 0);

    const distancesAttendues = new Map<number, number>([
        [0, 0],
        [1, 1],
        [2, 3],
        [3, 4]
    ]);
    const predecesseursAttendus = new Map<number, number>([
        [1, 0],
        [2, 1],
        [3, 2]
    ]);

    assertEquals(resultat.distances, distancesAttendues);
    assertEquals(resultat.predecesseurs, predecesseursAttendus);
});

Deno.test("Test de Dijkstra avec un graphe comportant un cycle", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 1);
    graphe.ajouterArete(1, 2, 2);
    graphe.ajouterArete(2, 0, 4);
    graphe.ajouterArete(2, 3, 1);

    const resultat = dijkstra(graphe, 0);

    const distancesAttendues = new Map<number, number>([
        [0, 0],
        [1, 1],
        [2, 3],
        [3, 4]
    ]);
    const predecesseursAttendus = new Map<number, number>([
        [1, 0],
        [2, 1],
        [3, 2]
    ]);

    assertEquals(resultat.distances, distancesAttendues);
    assertEquals(resultat.predecesseurs, predecesseursAttendus);
});

Deno.test("Test de Dijkstra avec des sommets non connectés", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 2);
    graphe.ajouterArete(1, 2, 3);

    const resultat = dijkstra(graphe, 0);

    const distancesAttendues = new Map<number, number>([
        [0, 0],
        [1, 2],
        [2, 5]
    ]);
    const predecesseursAttendus = new Map<number, number>([
        [1, 0],
        [2, 1]
    ]);

    assertEquals(resultat.distances, distancesAttendues);
    assertEquals(resultat.predecesseurs, predecesseursAttendus);
});

Deno.test("Test de Dijkstra avec sommet de départ invalide", () => {
    const graphe = new Graphe();
    graphe.ajouterArete(0, 1, 2);
    graphe.ajouterArete(1, 2, 3);

    assertThrows(() => {
        dijkstra(graphe, -1);
    }, Error, "Sommet de départ invalide");

    assertThrows(() => {
        dijkstra(graphe, 10);
    }, Error, "Sommet de départ invalide");
});