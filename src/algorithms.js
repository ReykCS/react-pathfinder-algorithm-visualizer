import dijkstra from './algorithms/dijkstra.js';
import aStar from './algorithms/aStar.js';
import dfs from './algorithms/depthFirst.js';
import bfs from './algorithms/breadthFirst.js';

const algorithms = [
    {
        name: "Dijkstra",
        method: dijkstra
    },
    {
        name: "A-Star",
        method: aStar
    },
    {
        name: "Depth-First-Search",
        method: dfs
    },
    {
        name: "Breadth-First-Search",
        method: bfs
    }
];

export default algorithms;