import React from 'react';
import "./css/options.css";

class AlgorithmOptions extends React.Component {
    render()    {
        return (
            <div className="options-holder">
                <div className="option first"
                    onClick={this.props.onClear}>
                        Clear
                </div>
                <div className="option"
                    onClick={this.props.onCreateNew}>
                        Create New
                </div>
                <div className="option"    
                    onClick={this.props.onCreateWeighted}>
                        Weighted
                </div>
                <div className="option last"
                    onClick={this.props.onStart}>
                        Start
                    
                </div>
            </div>
        )
    }
}

export default AlgorithmOptions;