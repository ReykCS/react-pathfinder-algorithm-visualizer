import assets from './../assets.js'; 

function getTarget(nodes)   {
    for ( let N of nodes)   {
        for ( let node of N )   {
            if (node.isEnd === 1 ) return node;
        }
    }
}

function getPriorityElement(node, heuristic)    {
    return {node, h: heuristic}
}

function getHeuristic(node, target) {
    let dx = Math.abs(node.x - target.x);
    let dy = Math.abs(node.y - target.y);
    return Math.sqrt(dx**2 + dy**2);
}

function execAStar(start, maxX, maxY, nodes, target)    {
    let queue = [];
    let parent = new Array(maxX * maxY).fill(0);
    nodes[start.y][start.x].distance = 0;
    queue.push(getPriorityElement(nodes[start.y][start.x], 0));
    let order = [];
    while ( queue.length > 0 ) {
        queue.sort((a, b) => a.h - b.h);
        let nodeComp = queue.shift();
        let node = nodeComp.node;
        let heuristic = nodeComp.h;
        let neighbors = assets.getNeighbors(node.x, node.y, maxX, maxY, nodes);
        if ( neighbors.length <= 0 ) return {parent: null, order};
        let currentIndex = assets.getIndex(node.x, node.y, maxX);
        if ( node.isEnd ) break;
        for ( let w of neighbors )  {
            let index = assets.getIndex(w.x, w.y, maxX);
            if ( nodes[w.y][w.x].distance > nodes[node.y][node.x].distance + heuristic + assets.getWeight(nodes[w.y][w.x], nodes[node.y][node.x])) {
                order.push(index);
                parent[index] = currentIndex;
                nodes[w.y][w.x].distance = nodes[node.y][node.x].distance + assets.getWeight(nodes[w.y][w.x], nodes[node.y][node.y]);
                queue.push(getPriorityElement(nodes[w.y][w.x], getHeuristic(w, target)));
            } 
        }
    }
    return {parent, order};
}

export default function aStar(start, maxX, maxY, nodes)  {
    const target = getTarget(nodes);
    return execAStar(start, maxX, maxY, nodes, target);
}