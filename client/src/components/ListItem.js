import React, { Component } from 'react';

class ListItem extends Component {



  render() {
    return (
      <li>item: {this.props.item}, purchased: {(this.props.purchased) ? 'true' : 'false'}, id: {this.props.id}</li>
    );
  }

}


export default ListItem;
