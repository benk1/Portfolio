import React, { Component } from 'react';

import './App.css';
import AddUser from "./components/AddUser";

class App extends Component {
  state = {
    users: [],
  };

  addUser = obj => {
    const users = this.state.users.slice ();
    users.push (obj);
    this.setState ({
      users,
    });
  };
  
  render() {
    return (
      <div className="App">
        <h1>Form Validation Using React</h1>
        <AddUser addUser={this.addUser} />
      </div>
    );
  }
}

export default App;
