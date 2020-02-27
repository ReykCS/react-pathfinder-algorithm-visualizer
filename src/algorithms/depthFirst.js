import assets from './../assets.js';

function dfs(start, maxX, maxY, nodes)  {
    // TO BE IMPLEMENTED
    let M = [];
    let parent = [];

    M.push(start);
    while( M.length > 0 )    {
        let node = M.shift();
        if ( node.isEnd ) break;
        let neighbors = assets.getNeighbors(node.x, node.y, maxX, maxY, nodes);
        for ( let n of neighbors )  {
            M.unshift(n);
        }
    }
} 

export default dfs;