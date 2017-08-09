import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import Debit from './Debit';
import DebitForm from './DebitForm';

class DebitList extends Component {
    render() {
        const debitComponents = this.props.debits.map((debit, index) => {
            return <Debit 
                description={debit.description}
                amount={debit.amount}
                date={debit.date} 
                key={index}
            />
        })

        return (
            <div>
                <h1>Debits</h1>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <DebitForm addNewDebitToDebitList={this.props.addNewDebitToDebitList}/>
                <br />
                {debitComponents}
                <Link to='/'>Home</Link>
            </div>
        )
    }
}

export default DebitList;