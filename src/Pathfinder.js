import React from 'react';
import Node from './Node.js';
import "./css/finder.css";
import assets from './assets.js';
import Selection from './SelectAlgorithm.js';
import AlgorithmOptions from './AlgorithmOptions.js';
import algorithms from './algorithms.js';

class Pathfinder extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
            nodes: [],
            maxX: 10,
            maxY: 10,
            mouseDown: false,
            maxWeight: 10,
            selected: 0
        }
        this.visualizePath = this.visualizePath.bind(this);
        this.handleSetNodeWall = this.handleSetNodeWall.bind(this);
        this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
        this.handleMousePressed = this.handleMousePressed.bind(this);
        this.handleSetNodeWallClicked = this.handleSetNodeWallClicked.bind(this);
        this.handleSetNodeWallDragged = this.handleSetNodeWallDragged.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.handleSelectAlgorithm = this.handleSelectAlgorithm.bind(this);
    }
    visualizePath(parent) {
        let {end, start, maxX} = this.state;
        let endIndex = assets.getIndex(end.x, end.y, maxX);
        let startIndex = assets.getIndex(start.x, start.y, maxX);
        let path = [];
        for ( let i = endIndex; i !== startIndex; i = parent[i]) {
            path.push(parent[i]);
        }
        path  = path.reverse();
        let cost = 0;
        let startNode = this.state.nodes[start.y][start.x];
        for ( let i = 0; i < path.length; i++ ) {
            let coordinates = assets.getXYFromIndex(path[i], maxX);

            cost += assets.getWeight(startNode, this.state.nodes[coordinates.y][coordinates.x]);
            startNode = this.state.nodes[coordinates.y][coordinates.x];
        }
        for ( let i = 0; i < path.length; i++ )    {
            setTimeout(() => {
                let nodes = this.state.nodes.slice();
                let coordinates = assets.getXYFromIndex(path[i], maxX);
                let newNode = {
                    ...nodes[coordinates.y][coordinates.x],
                    path: true
                };
                nodes[coordinates.y][coordinates.x] = newNode;
                this.setState({
                    nodes: nodes
                });
            }, 50 * i);
        }
        cost += assets.getWeight(startNode, this.state.nodes[end.y][end.x]);
        console.log("COST: " + cost);
    }
    visualizeDijkstra()  {
        let {start, maxX, nodes, maxY, selected} = this.state;
        //let result = dijkstra(start, maxX, maxY, nodes);
        let result = algorithms[selected].method(start, maxX, maxY, nodes);
        for (let i = 0; i < result.order.length; i++)    {
            setTimeout(() => {
                let newNodes = this.state.nodes.slice();
                let coordinates = assets.getXYFromIndex(result.order[i], maxX);
                let node = newNodes[coordinates.y][coordinates.x];
                let newNode = {
                    ...node,
                    visited: true
                };
                newNodes[coordinates.y][coordinates.x] = newNode;
                this.setState({
                    nodes: newNodes
                });
                if ( i >= result.order.length - 1) this.visualizePath(result.parent);
            }, 50 * i);
        }
    }
    componentDidMount() {
        this.resetBoard(0);
    }
    handleMousePressed(e)   {
        this.setState({
            mouseDown: e
        });
    }
    handleSetNodeWall(event)    {
        let nodes = this.state.nodes.slice();
        let [y, x] = event.split('-');
        let oldNode = nodes[y][x];
        if ( oldNode.isStart || oldNode.isEnd ) return;
        let newNode = {
            ...oldNode,
            isWall: ! oldNode.isWall
        };
        nodes[y][x] = newNode;
        this.setState({
            nodes: nodes
        });
    }
    handleSetNodeWallClicked(e)  {
        this.handleSetNodeWall(e);
    }
    handleSetNodeWallDragged(e) {
        if ( ! this.state.mouseDown ) return;
        else this.handleSetNodeWall(e);
    }
    clearBoard()   {
        let {maxX, maxY, start, end} = this.state;
        let nodes = assets.createGrid(start, end, maxY, maxX);

        console.log(nodes);

        this.setState({
            nodes: nodes
        });
    }
    resetBoard(weight)   {
        weight = weight ? weight : 0;
        let {maxX, maxY} = this.state;
        let start = assets.getRandom2DVector(maxX, maxY);
        let end = assets.getRandom2DVector(maxX, maxY);
        let nodes = assets.createGrid(start, end, maxY, maxX, weight);
        this.setState({
            nodes: nodes,
            start: start,
            end: end
        });
    }
    handleSelectAlgorithm(index)    {
        this.resetBoard(0);
        this.setState({
            selected: index
        });
    }
    render()    {
        let {nodes} = this.state;
        return (
            <React.Fragment>
                <Selection onClick={this.handleSelectAlgorithm} />
                <AlgorithmOptions 
                            onClear={this.clearBoard}
                            onCreateNew={() => this.resetBoard(0)}
                            onCreateWeighted={() => this.resetBoard(this.state.maxWeight)}
                            onStart={this.visualizeDijkstra} />
                <div onMouseLeave={() => this.handleMousePressed(false)} onMouseDown={() => this.handleMousePressed(true)} onMouseUp={() => this.handleMousePressed(false)} className="grid-holder">
                    {nodes.map((row, indY) => {
                        return (
                            <div className="row" key={indY}>
                                {row.map((val, indX) => {
                                    return <Node 
                                        handleClick={this.handleSetNodeWallClicked} handleDrag={this.handleSetNodeWallDragged} 
                                        value={val} 
                                        key={indX}></Node>
                                })}
                            </div>
                        )
                    })}
                </div>  
            </React.Fragment>
        )
    }
}

export default Pathfinder;
