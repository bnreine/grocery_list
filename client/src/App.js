import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import GroceryList from './components/GroceryList.js';

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          <div className="mdl-layout-icon"></div>
          <div className="mdl-layout__header-row">
            <span className="mdl-layout__title">Grocery List</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <Link to='/grocery_list_page' className="mdl-navigation__link">Grocery List</Link>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout__title">Grocery List</span>
          <nav className="mdl-navigation">
            <Link to='/grocery_list_page' className="mdl-navigation__link">Grocery List</Link>
          </nav>
        </div>

        <main className="mdl-layout__content">
          <Route path="/grocery_list_page" component={GroceryList} />
        </main>
      </div>
    );
  }
}

export default App;
