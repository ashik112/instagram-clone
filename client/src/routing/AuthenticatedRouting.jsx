/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import historyRoutes from './historyRoutes';

/**
 * * [Conditional rendering with Authentication]
 */
function AuthenticatedRouting({
  component: Component, authReducer, ...rest
}) {
  return (
    <>
      { authReducer.token && (
      <Route
        {...rest}
        render={(props) => (
          <>
            <Component {...props} />
          </>
        )}
      />
      )}
      {
        !authReducer.token && (
          <Redirect exact to={historyRoutes.home} />
        )
      }
    </>
  );
}

AuthenticatedRouting.propTypes = {
  authReducer: PropTypes.shape(),
};

AuthenticatedRouting.defaultProps = {
  authReducer: {
    token: null,
  },
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, null)(AuthenticatedRouting);
