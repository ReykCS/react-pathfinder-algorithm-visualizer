import dijkstra from './algorithms/dijkstra.js';
import aStar from './algorithms/aStar.js'

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
        name: "Depth-First-Search"
    }
];

export default algorithms;