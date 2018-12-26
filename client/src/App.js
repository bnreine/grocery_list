import React, { Component } from 'react';
import './App.css';
import ListItem from './components/ListItem.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists: [], //each is an object that contains item, id, and purchased properties
      nextItem: '',
      nextId: 0,
      nextPurchased: false
    }
  }

  componentDidMount() {
    this.getGroceryList();
  }


  getGroceryList(){
    let url = "/grocery_list";
    fetch(url)
    .then(r => {
      return r.json();
    })
    .then(data => {
      this.setState({lists: data.lists, nextId: data.lists[data.lists.length - 1].id + 1});
    })
    .catch(e => {
      console.log(`An error occurred: ${e}`);
    });
  }

  addListItem(newListItem){
    let url = "/grocery_list/add_item";
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newListItem})
    })
    .then(r => {
      return r.json();
    })
    .then(data => {
      console.log(`Success:`, JSON.stringify(data))
    })
    .catch(e => {
      console.log(`An error occurred: ${e}`);
    });
  }




  handleTextChange(e) {
    this.setState({ nextItem: e.target.value })
  }

  createNewItem(e) {
    e.preventDefault();
    const lists = this.state.lists;
    const nextListEntry = {
      item: this.state.nextItem,
      id: this.state.nextId,
      purchased: this.state.nextPurchased
    }
    const newListItem = {
      item: this.state.nextItem,
      purchased: this.state.nextPurchased
    }
    const nextNextId = this.state.nextId + 1;
    if (!this.state.nextItem) { return }
    this.setState({ nextItem: '', nextId: nextNextId, lists: [...lists, nextListEntry] });
    this.addListItem(newListItem);
  }


  render() {
    return (
      <div className="App">
        <ul>
          {this.state.lists.map((list, index) =>
            <ListItem key={index} purchased={list.purchased} item={list.item} id={list.id}/>
          )}
        </ul>
        <form onSubmit={(e) => this.createNewItem(e)} >
          <div>
            <label htmlFor="name">Enter new item name: </label>
            <input type="text" name="name" value={ this.state.nextItem } onChange={ (e) => this.handleTextChange(e)} />
          </div>
          <div>
            <input type="submit" value="Add Item"/>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
