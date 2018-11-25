import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/partials/login.scss';
import dd9AppLogo from '../static/images/dd9app_logo.png';

class TestLogin extends Component {
  render() {
    return (
      <div className="form-card text-center">
        <form className="my-4 px-5 pt-5 pb-3 bg-white rounded box-shadow signin-form" action="/api/v1/test/login" method="POST">
          <img className="mb-4 mt-2" src={dd9AppLogo} alt="DD9 Extranet V2.0" />
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input className="form-control" type="email" name="email" />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input className="form-control" type="password" name="password" />
          </div>
          <button className="btn btn-lg btn-light btn-block mb-5 signin-button" type="submit">Sign in locally</button>
          <p className="mt-1"><a href="https://dd9.com">DD9</a></p>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(TestLogin);
