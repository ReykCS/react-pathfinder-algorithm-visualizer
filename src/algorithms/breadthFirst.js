import assets from './../assets.js';

function bfs(start, maxX, maxY, nodes)  {
    let visited = new Array(maxX * maxY).fill(false);
    let startIndex = assets.getIndex(start.x, start.y, maxX);
    visited[startIndex] = true;
    let queue = [start];
    let parent = new Array(maxX * maxY);
    let order = [];

    while ( queue.length > 0 )    {
        let node = queue.shift();
        let currentIndex = assets.getIndex(node.x, node.y, maxX);
        order.push(currentIndex);
        if ( nodes[node.x][node.y].isEnd ) break;
        let neighbors = assets.getNeighbors(node.x, node.y, maxX, maxY, nodes);
        for ( let w of neighbors )  {
            let index = assets.getIndex(w.x, w.y, maxX);
            if ( visited[index] ) continue;
            visited[index] = true;
            queue.push(w);
            parent[index] = currentIndex;
        }
    }
    return {parent, order};
}

export default bfs;