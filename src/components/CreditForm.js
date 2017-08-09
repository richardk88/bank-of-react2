import React, {Component} from 'react';

class CreditForm extends Component {
    constructor() {
        super();

        this.state = {
            newCredit:{}
        }
    }
    _handleNewCreditChange = (event) => {
     const attributeName = event.target.name;
     const attributeValue = event.target.value;
 
     const newCredit = {...this.state.newCredit};
     newCredit[attributeName] = attributeValue;

     this.setState({newCredit})
   };

     _addNewCredit = (event) => {
        event.preventDefault();
        
        this.props.addNewCreditToCreditList(this.state.newCredit);
    };

    render() {
        return (
            <div>
                <form onSubmit={this._addNewCredit}>
                    <div><input name="description" type="text" placeholder="Description" onChange={this._handleNewCreditChange}/></div>
                    <div><input name="amount" type="number" min="0.00" step="0.01" placeholder="Amount" onChange={this._handleNewCreditChange}/></div>
                    <div><input type="submit" value="Create New Credit"/></div>
                </form>
            </div>
        )
    }
}

export default CreditForm;