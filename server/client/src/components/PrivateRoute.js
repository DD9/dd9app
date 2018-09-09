import React from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (props.logged_in ? (
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

function mapStateToProps(state, ownProps) {
  return {
    logged_in: state.auth,
    location: ownProps.path,
    routeProps: {
      exact: ownProps.exact,
      path: ownProps.path,
    },
  };
}

export default connect(mapStateToProps)(PrivateRoute);
