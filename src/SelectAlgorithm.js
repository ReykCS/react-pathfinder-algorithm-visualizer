import React from 'react';
import "./css/selector.css";
import algorithms from './algorithms.js';

class Selection extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
            algorithms: algorithms,
            selected: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e)  {
        console.log(e);
        console.log(this.state.algorithms[e]);
        this.setState({
            selected: e
        });

        this.props.onClick(e);
    }
    render()    {
        return(
            <div className="selector-holder">
                {this.state.algorithms.map((a, i) => 
                    <Type 
                        handleClick={this.handleClick} 
                        key={i} 
                        id={i} 
                        name={a.name} 
                        selected={this.state.selected === i ? true : false} />)}
            </div>
        )
    }
}

class Type extends React.Component {
    render()    {
        return(
            <div 
                onClick={() => this.props.handleClick(this.props.id)} className={"selector" + (this.props.selected ? " selected " : "") + (this.props.id == 0 ? " first " : "")}>
                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default Selection;