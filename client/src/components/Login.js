import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/partials/login.scss';
import dd9AppLogo from '../static/images/dd9app_logo.png';

class Login extends Component {
  render() {
    return (
      <div className="form-card text-center">
        <form className="my-4 px-5 pt-5 pb-3 bg-white rounded box-shadow signin-form" action="/auth/google" method="GET">
          <img className="mb-4 mt-2" src={dd9AppLogo} alt="DD9 Extranet V2.0" />
          <button className="btn btn-lg btn-light btn-block mb-5 signin-button" type="submit">Sign in with Google</button>
          <p className="mt-1"><a href="https://dd9.com">DD9</a></p>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Login);
