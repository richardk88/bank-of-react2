import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import DebitList from './components/DebitList';
import CreditList from './components/CreditList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 1234.67,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99'
      },
      debits: [],
      credits: []
    }
  }

  _getDebits = () => {
    axios.get(`http://localhost:4000/debits`)
      .then((response) => {
        const debits = response.data;
        this.setState({debits});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  _getCredits = () => {
    axios.get(`http://localhost:4000/credits`)
      .then((response) => {
        const credits = response.data;
        this.setState({credits});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  _calculateAccountBalance = () => {
    const totalCredits = this.state.credits.reduce((totalCredits, credit) => {
      return totalCredits + credit.amount;
    }, 0)

    const totalDebits = this.state.debits.reduce((totalDebits, debit) => {
      return totalDebits + debit.amount;
    }, 0)

    const accountBalance = totalCredits - totalDebits;
    this.setState({accountBalance})

    return totalCredits - totalDebits;
  }

  _addNewDebitToDebitList = (newDebit) => {
        const debits = [...this.state.debits];
        debits.push(newDebit);
        this.setState({debits});
  };
  
  _addNewCreditToDebitList = (newCredit) => {
        const credits = [...this.state.credits];
        credits.push(newCredit);
        this.setState({credits});
  };

  componentWillMount() {
    this._getDebits();
    this._getCredits();
  }

  render() {

    const accountBalance = this._calculateAccountBalance();

    const HomeComponent = () => (<Home accountBalance={parseFloat(accountBalance.toFixed(2))}/>);
    const UserProfileComponent = () => (
      <UserProfile 
        userName={this.state.currentUser.userName} 
        memberSince={this.state.currentUser.memberSince} />
    )
    const DebitListComponent = () => (
    <DebitList 
      debits={this.state.debits}
      accountBalance={parseFloat(accountBalance.toFixed(2))}
      addNewDebitToDebitList={this._addNewDebitToDebitList}/>)


    const CreditListComponent = () => (
    <CreditList 
      credits={this.state.credits}
      accountBalance={parseFloat(accountBalance.toFixed(2))}
      addNewCreditToCreditList={this._addNewCreditToCreditList}/>)

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent} />
            <Route exact path="/debitList" render={DebitListComponent} />
            <Route exact path="/creditList" render={CreditListComponent} />
          </div>
        </Router>
    );
  }
}

export default App;