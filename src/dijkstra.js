import assets from './assets.js';

export default function dijkstra(start, maxX, maxY, nodes)  {
    let parent = new Array(maxX * maxY).fill(0);
    nodes[start.y][start.x].distance = 0;
    let m = [];
    m.push(nodes[start.y][start.x]);

    let order = [];
    while ( m.length > 0 )  {
        assets.sortNodesByDistance(m);
        console.log(m);
        let node = m.shift();
        let neighbors = assets.getNeighbors(node.x, node.y, maxX, maxY, nodes);
        if ( neighbors.length <= 0 ) return {parent: null, order};
        let currentIndex = assets.getIndex(node.x, node.y, maxX);
        if ( node.isEnd ) break;
        for ( let w of neighbors)   {
            let index = assets.getIndex(w.x, w.y, maxX);
            if ( nodes[w.y][w.x].distance > nodes[node.y][node.x].distance + assets.getWeight(nodes[w.y][w.x], nodes[node.y][node.y]))   {
                order.push(index);
                parent[index] = currentIndex;
                nodes[w.y][w.x].distance = nodes[node.y][node.x].distance + assets.getWeight(nodes[w.y][w.x], nodes[node.y][node.y]);
                m.push(nodes[w.y][w.x]);
            }   
        }
    }

    return {parent, order};
}