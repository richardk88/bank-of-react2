import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import Credit from './Credit';
import CreditForm from './CreditForm';

class CreditList extends Component {
    render() {
        const creditComponents = this.props.credits.map((credit, index) => {
            return <Credit 
                description={credit.description}
                amount={credit.amount}
                date={credit.date} 
                key={index}
            />
        })

        return (
            <div>
                <h1>Credits</h1>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <CreditForm addNewCreditToCreditList={this.props.addNewCreditToCreditList}/>
                <br />
                {creditComponents}
                <Link to='/'>Home</Link>
            </div>
        )
    }
}

export default CreditList;