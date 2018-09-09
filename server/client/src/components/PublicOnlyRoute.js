import React from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicOnlyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!this.props.auth ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/dashboard',
          state: { from: props.location },
        }}
      />
    ))
    }
  />
);

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(PublicOnlyRoute);
