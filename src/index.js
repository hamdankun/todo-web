import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';
import PrivateRoute from './functions/PrivateRoute';
import { isAuthenticated } from './functions/AuthRepo';
import Login from './components/Login';
import Logout from './components/Logout';
import { Index as TodoList } from './components/todo/Index';
import { Add as TodoAdd } from './components/todo/Add';
import { Edit as TodoEdit } from './components/todo/Edit';
import reducer from './reducers';
import './index.css';

const store = createStore(reducer);

const GuestRoute = ({ component: Component, ...rest }) => (
   <Route {...rest} render={props => (
     isAuthenticated() ? (
       <Redirect to={{
         pathname: '/todo/list',
         state: { from: props.location }
       }}/>

     ) : (<Component {...props}/>)
  )}/>
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" render={props => { return (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        ) } } />
        <GuestRoute path="/login" component={Login} />
        <PrivateRoute path="/todo/list" component={TodoList} />
        <PrivateRoute path="/todo/add" component={TodoAdd} />
        <PrivateRoute path="/todo/edit/:id" component={TodoEdit} />
        <Route path="/logout" component={Logout}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);


store.subscribe(() => {
  console.log(store.getState());
});
