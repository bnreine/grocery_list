import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import GroceryList from './components/GroceryList.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      currentEmail: '',
      currentPassword: ''
    }
  }

  renderGroceryList(){
    if (this.state.isAuthenticated){
      return(
        <Route exact path="/" component={GroceryList} />
      )
    }
  }

  renderGroceryListLink(){
    if(this.state.isAuthenticated){
      return(
        <Link to='/grocery_list_page' className="mdl-navigation__link">Grocery List</Link>
      )
    }
  }


  renderSignOutLink(){
    if(this.state.isAuthenticated){
      return(
        <a href="/" className="mdl-navigation__link">Sign Out</a>
      )
    }
  }

  handleEmailChange(e){
    this.setState({currentEmail: e.target.value});
  }

  handlePasswordChange(e){
    const password = this.state.currentPassword.slice();
    const currentPasswordLength = e.target.value.length;
    const newPassword = password + e.target.value[currentPasswordLength - 1];
    this.setState({currentPassword: newPassword});
  }


  authenticateUser(e){
    e.preventDefault();
    //console.log(`username: ${this.state.currentUserName}, password: ${this.state.currentPassword}`)
    this.setState({isAuthenticated: true})
  }


  renderSignInForm(){
    if(!this.state.isAuthenticated){
      return(
        <div className='App'>
          <h3>Please Sign In...Welcome to the Grocery List Application</h3>
          <form onSubmit={(e) => this.authenticateUser(e)} >
            <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" value={this.state.emailName} onChange={ (e) => this.handleEmailChange(e)} />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="text" name="password" value={this.state.currentPassword.split('').map(letter => letter = '*').join('')} onChange={ (e) => this.handlePasswordChange(e)} />
            </div>
            <div>
              <input type="submit" value="Sign In"/>
            </div>
          </form>
        </div>
      )
    }
  }


  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          <div className="mdl-layout-icon"></div>
          <div className="mdl-layout__header-row">
            <span className="mdl-layout__title">Grocery List</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              {this.renderSignOutLink()}
            </nav>
          </div>
        </header>
        <main className="mdl-layout__content">
          {this.renderSignInForm()}
          {this.renderGroceryList()}
        </main>
      </div>
    );
  }
}

export default App;
