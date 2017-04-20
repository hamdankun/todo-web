import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';
import Base from '../components/layouts/Base';
import { onDoAuth, onSuccessAuth, onErrorAuth } from '../actions/auth';


class LoginCont extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      validEmail: true,
      validPassword: true
    }
  }

  handleChange(event) {

    if (event.target.value === '') {
      if (event.target.name === 'email') {
        this.setState({validEmail: false});
      } else {
        this.setState({validPassword: false});
      }
    } else {
      if (event.target.name === 'email') {
        this.setState({validEmail: true});
      } else {
        this.setState({validPassword: true});
      }
    }

    this.setState({[event.target.name] : event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(onDoAuth());
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };

    this.auth(credentials);
  }

  auth(credentials) {
    console.log(axios({
      url: 'http://kunapi.esy.es/api/v1/auth',
      method: 'POST',
      data: credentials,
      responseType: 'json'
    })
    .then((response) => {
      this.props.dispatch(onSuccessAuth(response.data));
    })
    .catch((error) => {
      this.props.dispatch(onErrorAuth(error.response.data));
    }));
  }

  componentDidMount() {

  }

  render() {
    return (<Base>
        <form onSubmit={this.handleSubmit}>
          <Row className="todo-login-wrapper">
              <Input type="email" name="email" label="Email" s={12} onChange={this.handleChange} className={this.state.validEmail ? '' : 'invalid'} autoComplete="off"/>
              <Input type="password" name="password" label="password" s={12} onChange={this.handleChange} className={this.state.validPassword ? '' : 'invalid'}/>
              <div>
                <Button waves='light' disabled={this.props.auth.isLoading ? true : false} className="btn-login">{this.props.auth.isLoading ? 'Prosessing' : 'Login'}</Button>
              </div>
          </Row>
        </form>
    </Base>)
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

LoginCont = connect(
  mapStateToProps
)(LoginCont);

export default LoginCont;
