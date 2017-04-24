import React, { Component } from 'react';
import AddCont from '../../containers/todo/AddCont';

export class Edit extends Component {

  render() {
    return (
      <AddCont todoId={this.props.match.params.id} />
    )
  }
}
