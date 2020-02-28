import assets from './../assets.js';

function dfs(start, maxX, maxY, nodes)  {
    let M = [];
    let parent = new Array(maxX * maxY).fill(0);
    let visited = new Array(maxX * maxY).fill(false);
    let startIndex = assets.getIndex(start.x, start.y, maxX);
    visited[startIndex] = true;

    console.log(start);
    let dftAlg = function(v, i) {
        M.push(i);
        console.log(v);
        if ( nodes[v.y][v.x].isEnd ) return;
        let neighbors = assets.getNeighbors(v.x, v.y, maxX, maxY, nodes);

        for ( let w of neighbors )  {
            let index = assets.getIndex(w.x, w.y, maxX);
            if ( visited[index] ) continue;
            visited[index] = true;
            parent[index] = i;
            return dftAlg(w, index);
        }
    }
    dftAlg(start, startIndex);
    return {parent, order: M};
} 

export default dfs;