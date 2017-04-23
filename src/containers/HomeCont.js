import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col, Card, Preloader, Icon, Pagination } from 'react-materialize';
import Base from '../components/layouts/Base';
import { onProsessingData, onProsessedData } from '../actions/todo';

const List = (props) => {
  const { todo, eventHandler } = props;
  return (
    <Col m={6} s={16}>
      <Card className='blue-grey darken-1' textClassName='white-text' title={todo.title}
      actions={[<a className="pointer" onClick={() => eventHandler.onEdit(todo.id) }>Edit</a>, <a className="pointer" onClick={() =>  eventHandler.onDelete(todo.id) }>Delete</a>]}>
      {todo.description}
      </Card>
    </Col>
  )
}

const Modal = (props) => (
  <div className="modal">
    <div className="modal-content">
      <h4>Confirm Delete</h4>
      <p>Are you sure ?</p>
    </div>
    <div className="modal-footer">
      <button className="modal-action waves-effect waves-green btn red margin-left-small"  onClick={props.doDelete} disabled={props.isLoading}>Yes</button>
      <button className="modal-action modal-close waves-effect waves-green btn green" disabled={props.isLoading}>No</button>
    </div>
  </div>
)

const PageLoader = () => (
  <Row className="margin-top-small">
    <Col s={4}>
      <Preloader size='big'/>
    </Col>
  </Row>
)

class HomeCont extends Component {

  constructor(props) {
    super(props);
    if (!this.props.todo.data.length && !this.props.todo.isLoading) {
      this.fetchData();
    }
    this.state = { todo_id: 0 };
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  fetchData(targetPage = 1) {
    this.props.dispatch(onProsessingData('fetching-data'));
    this.http()
      .get('/todo?page='+targetPage)
      .then((response) => {
        this.props.dispatch(onProsessedData(response.data));
      })
      .catch((error) => {
        this.props.dispatch(onProsessedData(error.response.data));
      })
  }

  http() {
    return axios.create({
      baseURL: 'http://kunapi.esy.es/api/v1',
      headers: { 'Authorization': localStorage.getItem('token') }
    });
  }

  onEdit(id) {

  }

  onDelete(id) {
    window.$('.modal').modal('open');
    this.setState({todo_id: id});
  }

  doDelete() {
    this.props.dispatch(onProsessingData('delete-data'));
    let _self = this;
    this.http()
      .delete('/todo/'+this.state.todo_id)
      .then((response) => {
        window.$('.modal').modal('close');
        _self.fetchData();
      })
      .catch((error) => {
        this.props.dispatch(onProsessedData(error.response.data));
      })
  }

  paginate(nextPage) {
    this.fetchData(nextPage);
  }

  componentDidMount() {
    window.$('.modal').modal();
  }

  render() {
    const { data, isLoading } = this.props.todo;
    const todos = data.data ? data.data : [];
    const onLoadData = !isLoading ? <div className="todo-empty"><Icon left large>shuffle</Icon> <h1>Empty Todo</h1> <a className="pointer" onClick={this.fetchData}>Reload</a></div> : <PageLoader />;
    return (
      <Base>
        <Row className="centered-content margin-top-small">
          { !todos.length ? onLoadData : todos.map((todo, key) => {
            return <List todo={todo} eventHandler={{ 'onEdit': this.onEdit, 'onDelete': this.onDelete }}/>
          }) }
          { !todos.length ? '' : <Pagination items={data.last_page} activePage={data.current_page} maxButtons={3} onSelect={this.paginate}/> }
        </Row>
        <Modal doDelete={() => this.doDelete(data.current_page+1)} isLoading={isLoading}/>
      </Base>
    )
  }
}


const mapStateToProps = (state, todo) => ({
  todo: state.todo
})

HomeCont = connect(
  mapStateToProps
)(HomeCont);

export default HomeCont;
