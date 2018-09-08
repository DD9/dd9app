import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import '../styles/partials/app.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <div>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Login} />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
