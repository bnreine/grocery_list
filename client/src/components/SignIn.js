import React, { Component } from 'react';


class SignIn extends Component {

  render() {
    return (
      <div className="App">
        <h1>Please Sign In</h1>
        <form onSubmit={(e) => this.authenticateUser(e)} >
          <div>
            <label htmlFor="userName">User Name: </label>
            <input type="text" name="userName" value={'user name'} onChange={ () => console.log("hello user name")} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="text" name="password" value={'password'} onChange={ () => console.log("hello password")} />
          </div>
          <div>
            <input type="submit" value="Add Item"/>
          </div>
        </form>
      </div>
    );
  }

}

export default SignIn;
