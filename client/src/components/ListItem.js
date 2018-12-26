import React, { Component } from 'react';

class ListItem extends Component {

renderCheckBox(){
  if(this.props.id > 0){
    return(
      <input type="checkbox" checked={this.props.purchased} onChange={this.props.togglePurchased}/>
    )
  }
}

renderDeleteBox(){
  if(this.props.id > 0){
    return(
      <button type="button" onClick={this.props.delete}>Delete</button>
    )
  }
}


  render() {
    return (
      <li>
        {this.renderCheckBox()}
        <span>item: {this.props.item}, purchased: {(this.props.purchased) ? 'true' : 'false'}, id: {this.props.id}</span>
        {this.renderDeleteBox()}
      </li>
    );
  }

}


export default ListItem;
