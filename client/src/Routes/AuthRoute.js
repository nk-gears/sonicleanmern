import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={componentProps => {
      if (routeProps.private) {
        if (!routeProps.loggedIn) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...componentProps} />;
        }
      } else {
        if (routeProps.loggedIn) {
          return <Redirect to="/" />;
        } else {
          return <Component {...componentProps} />;
        }
      }
    }}
  />
);

const mapStateToProps = store => ({
  loggedIn: store.auth.isLoggedIn,
});

export default connect(mapStateToProps)(AuthRoute);
