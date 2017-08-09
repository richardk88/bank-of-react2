import React, {Component} from 'react';

class Credit extends Component {
    render() {
        return (
            <div>
                <div>{this.props.description}</div>
                <div>{this.props.amount}</div>
                <div>{this.props.date}</div>
                <hr />
            </div>
        )
    }
}

export default Credit;