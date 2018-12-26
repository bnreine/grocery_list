import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import ListItem from './components/ListItem.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists: [],
      nextItem: '',
      nextId: 0,
      nextPurchased: false,
      endpoint: ""/*"https://bnreine-grocery-list.herokuapp.com/"  "http://127.0.0.1:5000"*/
    }
  }

  componentDidMount() {
    this.getServerURL();
    this.getGroceryListRequest();
    this.openSocket();
  }


  getServerURL(){
    let url = "/get_url";
    fetch(url)
    .then(r => {
      return r.json();
    })
    .then(data => {
      this.setState({endpoint: data.url});
    })
    .catch(e => {
      console.log(`An error occurred: ${e}`);
    });
  }



  openSocket(){
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("listEntriesDatabase", data => {
      this.setState({ lists: data.lists })
    });
  }




  getGroceryListRequest(){
    let url = "/grocery_list";
    fetch(url)
    .then(r => {
      return r.json();
    })
    .then(data => {
      this.setState({lists: data.lists});
    })
    .catch(e => {
      console.log(`An error occurred: ${e}`);
    });
  }

  addListItemRequest(newListItem){
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
      //this.setState({})
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
    if (!this.state.nextItem) { return }
    this.setState({ nextItem: '', lists: [...lists, nextListEntry] });
    this.addListItemRequest(newListItem);
  }


  togglePurchased(index){
    const lists = this.state.lists.slice();  //makes a copy of the lists array
    const listItem = lists[index];
    listItem.purchased = listItem.purchased ? false : true;
    this.setState({ lists: lists });
    this.togglePurchasedRequest(listItem);
  }


  togglePurchasedRequest(listItem){
    let url = "/grocery_list/check_uncheck_item";
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({listItem})
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


  delete(deletionIndex){
    console.log(`Deleted: ${deletionIndex}`);
    const deletionListItem = this.state.lists[deletionIndex];
    const newLists = this.state.lists.slice().filter((list, index) => index !== deletionIndex);
    this.setState({lists: newLists});
    this.deleteListItemRequest(deletionListItem);
  }


  deleteListItemRequest(listItem){
    let url = "/grocery_list/delete";
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({listItem})
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


  render() {
    return (
      <div className="App">
        <ul>
          {this.state.lists.map((list, index) =>
            <ListItem key={index} purchased={list.purchased} item={list.item} id={list.id} togglePurchased={() => this.togglePurchased(index)} delete={() => this.delete(index)} />
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
