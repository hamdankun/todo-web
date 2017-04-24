import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Base from '../../components/layouts/Base';
import { Row, Col, Card, Preloader, Icon, Pagination, Input, Button } from 'react-materialize';
import { onProsessingData, onProsessedData } from '../../actions/todo';
import { post, get, patch } from '../../functions/http';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

class AddCont extends Component {

  constructor(props) {
    super(props);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: '',
      selectedDate: moment(),
      description: '',
      notify: 0
    }

    if (props.todoId && !props.todo.data.length && !props.todo.isLoading) {
      this.findById(props.todoId);
    }
  }

  handleChangeDate(date) {
    this.setState({selectedDate: date});
  }

  handleChange(event) {
    let value = '';

    if (event.target.name === 'notify') {
      value = event.target.checked ? 1 : 0;
    } else {
      value = event.target.value;
    }
    this.setState({[event.target.name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let todo = {
      title: this.state.title,
      date: this.state.selectedDate ? this.state.selectedDate.format("YYYY/MM/DD") : '',
      description: this.state.description,
      notify: this.state.notify
    }
    this.props.dispatch(onProsessingData('save-data'));
    let http;
    let actionType;

    if (!this.props.todoId) {
        http = post('/todo', todo);
        actionType = 'save-data';
    } else {
        http = patch('/todo/'+this.props.todoId, todo);
        actionType = 'update-data';
    }

    http.then((response) => {
      this.props.dispatch(onProsessedData(response.data, actionType));
    }).catch((error) => {
      if (error && error.response) {
        let errorResponse = {
          status: error.response.data.status,
          code: error.response.data.code,
          data: error. response.data.errors
        };
        this.props.dispatch(onProsessedData(errorResponse, 'save-data'));
      }
    })
  }

  findById(todoId) {
    this.props.dispatch(onProsessingData('fetch-data'))
    get('todo/'+todoId)
    .then((response) => {
      this.props.dispatch(onProsessedData(response.data));
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo.data.id) {
      let todo = nextProps.todo.data;
      window.document.getElementById('title').value = todo.title;
      window.document.getElementById('description').value = todo.description;
      document.getElementById("notify").checked = todo.notify === "1" ? true : false;
      this.setState({ title:todo.title, description: todo.description, notify: todo.notify, selectedDate: moment(todo.date) });
    }
  }

  componentDidMount() {

  }

  render() {
    const { code, data, status, action_type } = this.props.todo;

    if (code === 201 || (code === 200 && action_type === 'update-data')) {
      return ( <Redirect to={{
        pathname: '/todo/list',
        state: { from: 'login' }
      }}/> )
    }

    return (
      <Base>
        <form onSubmit={this.handleSubmit} className="margin-top-small">
          <Row className="centered-content margin-top-small">
            <Input name="title" id="title" s={6} label="Title" autoComplete="off" placeholder="Title" onChange={this.handleChange} className={code !== 422 ? '' : data.title ? 'invalid' : '' }/>
            <div className="col input-field s6">
              <DatePicker selected={this.state.selectedDate} autoComplete="off" placeholderText="Date" className="red-border" onChange={this.handleChangeDate} dateFormat="DD/MM/YYYY" minDate={moment()}
              className={code !== 422 ? '' : data.date ? 'invalid' : '' } />
            </div>
            <Input name="description" id="description" s={6} label="Description" autoComplete="off" placeholder="Description" onChange={this.handleChange} className={code !== 422 ? '' : data.description ? 'invalid' : '' }/>
            <Input name="notify" id="notify" s={6} type='checkbox' value='1' label='Notify' onChange={this.handleChange} />
            <Col s={6} className="margin-top-small">
              <Button waves='light' disabled={this.props.todo.isLoading ? true : false} className="btn-login">{this.props.todo.isLoading ? 'Saving' : 'Save'}</Button>
            </Col>
          </Row>
        </form>
      </Base>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: state.todo,
  todoId: ownProps.todoId
})

AddCont = connect(
  mapStateToProps
)(AddCont);

export default AddCont;
