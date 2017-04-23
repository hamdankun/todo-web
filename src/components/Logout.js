import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

  constructor(props) {
    super(props);
    localStorage.removeItem('token');
  }

  render() {
    return (<Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }}/> )
  }
}

export default Logout;
