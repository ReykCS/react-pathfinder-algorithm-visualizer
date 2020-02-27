import dijkstra from './algorithms/dijkstra.js';
import aStar from './algorithms/aStar.js';
import dfs from './algorithms/depthFirst.js';

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
    }
];

export default algorithms;