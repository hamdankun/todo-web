import React, { Component } from 'react';
import { Navbar } from 'react-materialize';

class Header extends Component {
  render() {
    return (
      <Navbar brand='YourTodo' className="todo-navbar" right>
      </Navbar>
    )
  }
}

export default Header;
