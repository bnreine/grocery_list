import React, { Component } from 'react';

class ListItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      didClickEdit: false,
      temporaryItem: ''
    }
  }



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

renderEditUpdateBox(){
  if(this.props.id > 0 && !this.state.didClickEdit){
    return(
      <button type="button" onClick={() => this.onEditClick()}>Edit</button>
    )
  } else if(this.props.id > 0 && this.state.didClickEdit){
    return(
      <button type="button" onClick={() => this.onUpdateClick()}>Update</button>
    )
  }
}

onEditClick(){
  this.setState({didClickEdit: true, temporaryItem: this.props.item});
}

onUpdateClick(){
  this.setState({didClickEdit: false});
  this.updateItemRequest();
}


updateItemRequest(){
  const newListItem = {
    item: this.state.temporaryItem,
    purchased: this.props.purchased,
    id: this.props.id
  }

  let url = "/grocery_list/update_item";
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




renderItem(){
  if(!this.state.didClickEdit){
    return(
      <span>{this.props.item}</span>
    )
  } else {
    return(
      <input type="text" name="name" value={this.state.temporaryItem} onChange={(e) => this.handleEditTextChange(e)} />
    )
  }
}



handleEditTextChange(e){
  this.setState({temporaryItem: e.target.value})
}



  render() {
    return (
      <li>
        {this.renderCheckBox()}
        {this.renderItem()}
        {this.renderDeleteBox()}
        {this.renderEditUpdateBox()}
      </li>
    );
  }

}


export default ListItem;
