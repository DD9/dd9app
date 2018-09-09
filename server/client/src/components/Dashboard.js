import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(Dashboard);
