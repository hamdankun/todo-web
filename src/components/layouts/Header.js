import React, { Component } from 'react';
import { Navbar, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../functions/AuthRepo';

const Menu = (props) => {
  return <li><Link to={props.to}>{props.children}</Link></li>
}

class Header extends Component {
  render() {
    return (
      <Navbar brand='YourTodo' className="todo-navbar" right>
        {isAuthenticated() ? <Menu to="/todo/add"><Icon left>playlist_add</Icon>Add Todo</Menu> : null}
        {isAuthenticated() ? <Menu to="/logout"><Icon large>launch</Icon></Menu> : null}
      </Navbar>
    )
  }
}

export default Header;
