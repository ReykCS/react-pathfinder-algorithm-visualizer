import React from 'react';
import "./css/options.css";

class AlgorithmOptions extends React.Component {
    constructor(props)  {
        super(props);
    }

    render()    {
        return (
            <div className="options-holder">
                <button 
                    onClick={this.props.onClear}>
                        Clear
                </button>
                <button 
                    onClick={this.props.onCreateNew}>
                        Create New
                </button>
                <button     
                    onClick={this.props.onCreateWeighted}>
                        Create Weighted
                </button>
                <button 
                    onClick={this.props.onStart}>
                        Start
                </button>
            </div>
        )
    }
}

export default AlgorithmOptions;