import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/auth';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import '../styles/partials/app.css';
import '../styles/partials/normalize.css';

import AuthedRoute from './HOCRoutes/AuthedRoute';
import PublicOnlyRoute from './HOCRoutes/PublicOnlyRoute';
import Login from './Login';
import Dashboard from './Dashboard';

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
      </div>
    );
  }
}

export default connect(null, { getCurrentUser })(App);
