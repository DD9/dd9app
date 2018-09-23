import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicOnlyRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth ? (
      <Redirect
        to={{
          pathname: '/timeEntry/new',
          state: { from: props.location },
        }}
      />
    ) : (
      <Component {...props} />
    ))
    }
  />
);

function mapStateToProps({ auth }) {
  return { auth: auth._id };
}

export default withRouter(connect(mapStateToProps)(PublicOnlyRoute));
