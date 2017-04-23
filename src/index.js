import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';
import PrivateRoute from './functions/PrivateRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import reducer from './reducers';
import './index.css';

const store = createStore(reducer);
const GuestRoute = ({ component: Component, ...rest }) => (
   <Route {...rest} render={props => (
     !localStorage.getItem('token') ? (
       <Component {...props}/>
     ) : (
       <Redirect to={{
         pathname: '/home',
         state: { from: props.location }
       }}/>
     )
  )}/>
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" render={props => { return (null) } } />
        <GuestRoute path="/login" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <Route path="/logout" component={Logout}/>
        <Redirect to="login" from="/" />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);


store.subscribe(() => {
  console.log(store.getState());
});
