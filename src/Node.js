import React from 'react';
import "./css/node.css";

class Node extends React.Component {
    constructor(props)  {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = this.props.value;
    }
    handleClick(event)   {
        this.props.handleDrag(event.target.id);
    }
    render()    {
        let extraClass = "";
        let props = this.props.value;
        if ( props.visited) extraClass = " visited";
        if ( props.isWall ) extraClass = " wall";
        if ( props.path ) extraClass = " path";
        if ( props.isStart ) extraClass = " start";
        if ( props.isEnd ) extraClass = " end";

        if ( props.mostRight ) extraClass += " right";
        if ( props.lastRow ) extraClass += " down";
        return(
            <div onClick={(event) => this.props.handleClick(event.target.id)} onMouseOver={this.handleClick} id={this.state.y + "-" + this.state.x} className={"node" + extraClass}>{this.props.value.isWeighted ? this.props.value.weight : ""}</div>
        )
    }
}

export default Node;