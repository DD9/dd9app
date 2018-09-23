import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, admin, ...rest }) => (
  <Route
    {...rest}
    render={props => (admin ? (
      <Component {...props} />
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
    return { admin: false };
  }
  if (auth.permissions[0].admin) {
    return { admin: true };
  }
  return { admin: false };
}

export default withRouter(connect(mapStateToProps)(AdminRoute));
