import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, ProgressBar } from 'react-materialize';

class ProgressBarAreaCont extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      isLoading ?
      <Row className="todo-progressbar">
        <Col s={12} className="todo-progressbar-col">
          <ProgressBar />
        </Col>
      </Row> : null
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading || state.todo.isLoading
})

ProgressBarAreaCont = connect(
  mapStateToProps
)(ProgressBarAreaCont);

export default ProgressBarAreaCont;
