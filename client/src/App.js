import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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


  renderSignInForm(){
    if(!this.state.isAuthenticated){
      return(
        <div className='App'>
          <h3>Please Sign In...Welcome to the Grocery List Application</h3>
          <form onSubmit={(e) => this.authenticateUser(e)} >
            <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" value={this.state.currentEmail} onChange={ (e) => this.handleEmailChange(e)} />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="text" name="password" value={this.state.currentPassword} onChange={ (e) => this.handlePasswordChange(e)} />
            </div>
            <div>
              <input type="submit" value="Sign In"/>
            </div>
          </form>
        </div>
      )
    }
  }

  renderGroceryList(){
    if (this.state.isAuthenticated){
      return(
        <Route exact path="/" component={GroceryList} />
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
    this.setState({currentPassword: e.target.value})
  }


  authenticateUser(e){
    e.preventDefault();
    if(this.state.currentEmail === "member@gmail.com" && this.state.currentPassword === "mmmmmm"){
      this.setState({isAuthenticated: true})
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
