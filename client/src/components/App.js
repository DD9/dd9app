import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/partials/app.scss';
import '../styles/partials/normalize.scss';
import '../styles/partials/toasts.scss';

import AuthedRoute from './HOCRoutes/AuthedRoute';
import PublicOnlyRoute from './HOCRoutes/PublicOnlyRoute';
import Login from './Login';
import Dashboard from './Dashboard';

import { getCurrentUser } from '../actions/auth';

class App extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <PublicOnlyRoute exact path="/login" component={Login} />
            <AuthedRoute path="/" component={Dashboard} />
          </Switch>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    );
  }
}

export default connect(null, { getCurrentUser })(App);
