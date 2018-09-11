import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/auth';

import '../styles/partials/app.css';
import '../styles/partials/normalize.css';

import Login from './Login';
import Dashboard from './Dashboard';

class App extends Component {
  componentWillMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchCurrentUser })(App);
