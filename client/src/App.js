import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists: [

      ]
    }
  }

  componentDidMount() {


      //get grocery list data from backend!!!
      let url = "/grocery_list";

      fetch(url)
      .then(r => {
        console.log(r);
        return r.json();
      })
      .then(data => {
        console.log(data.lists);
        this.setState({lists: data.lists});
      })
      .catch(e => {
        console.log(`An error occurred: ${e}`);
      });


  }

  handleClick(){
    console.log(this.state.lists[0].item);
  }


  render() {
    return (
      <div className="App">
        <ul>
          {this.state.lists.map((list, index) =>
            <li key={index}>{list.item}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
