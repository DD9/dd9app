import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    ))
    }
  />
);

function mapStateToProps({ auth }) {
  return { auth: auth._id };
}

export default withRouter(connect(mapStateToProps)(AuthedRoute));
