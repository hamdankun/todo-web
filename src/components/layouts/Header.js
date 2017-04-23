import React, { Component } from 'react';
import { Navbar, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <Navbar brand='YourTodo' className="todo-navbar" right>
          <li><a href="badges.html"><Icon left>playlist_add</Icon>Add Todo</a></li>
          <li><Link to="/logout"><i className="large material-icons">launch</i></Link></li>
      </Navbar>
    )
  }
}

export default Header;
