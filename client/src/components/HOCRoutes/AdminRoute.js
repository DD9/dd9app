import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({
  component: Component, admin, auth, ...rest
}) => (
  <Route
    {...rest}
    render={props => (admin ? (
      <Component {...props} auth={auth} />
    ) : (
      <Redirect
        to={{
          pathname: '/timeEntry/new',
          state: { from: props.location },
        }}
      />
    ))
    }
  />
);

function mapStateToProps({ auth }) {
  if (!auth.permissions) {
    return { admin: false, auth };
  }
  if (auth.permissions[0].admin) {
    return { admin: true, auth };
  }
  return { admin: false, auth };
}

export default withRouter(connect(mapStateToProps)(AdminRoute));
