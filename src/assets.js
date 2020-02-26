const assets = {
    getRandom2DVector(maxX, maxY) {
        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        }
    },
    getNeighbors(x, y, maxX, maxY, nodes)   {
        let neighbors = [];
        if ( x > 0 && ! nodes[y][x-1].isWall ) neighbors.push({x: x - 1, y});
        if ( y > 0 && ! nodes[y-1][x].isWall ) neighbors.push({x, y: y - 1});
        if ( x + 1 < maxX && ! nodes[y][x+1].isWall ) neighbors.push({x: x + 1, y});
        if ( y + 1 < maxY && ! nodes[y+1][x].isWall ) neighbors.push({x, y: y + 1});
        return neighbors;
    },
    getIndex(x, y, maxX)  {
        return y * maxX + x;
    },
    getXYFromIndex(index, maxX)   {
        return {
            x: index % maxX,
            y: Math.floor(index / maxX)
        }
    },
    createGrid(start, end, maxY, maxX, randomWeight)  {
        
        let newNodes = [];
        for ( let row = 0; row < maxY; row ++)  {
            newNodes[row] = [];
            for ( let col = 0; col < maxX; col++) {
                newNodes[row].push({
                    x: col,
                    y: row,
                    isStart: ((col === start.x) && (row === start.y)) ? 1 : 0,
                    isEnd: ((col === end.x) && (row === end.y)) ? 1 : 0,
                    weight: randomWeight ? Math.floor(Math.random() * randomWeight) : 1,
                    isWeighted: randomWeight ? true : false,
                    distance: 100000000,
                    visited: false,
                    isWall: false
                });
            }
        }
        return newNodes;
    },
    sortNodesByDistance(nodes)  {
        nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    },
    getWeight(nodeA, nodeB) {
        return Math.abs(nodeA.weight - nodeB.weight);
    }
}

export default assets;