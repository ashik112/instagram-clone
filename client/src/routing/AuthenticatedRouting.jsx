/* eslint-disable react/prop-types,react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
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
          <Redirect exact to={historyRoutes.login} />
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
