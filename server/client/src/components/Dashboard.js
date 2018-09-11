import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import RequireAuth from './RequireAuth';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>You must log in to view the page</p>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default RequireAuth(Dashboard);
