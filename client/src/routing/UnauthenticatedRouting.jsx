/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import historyRoutes from './historyRoutes';

/**
 * * [Conditional rendering with Authentication]
 */
// eslint-disable-next-line react/prop-types
function UnauthenticatedRouting({ component: Component, authReducer, ...rest }) {
  return (
    <>
      {
        !authReducer.token && (
          <Route
            {...rest}
            render={(props) => (
              <Component {...props} />
            )}
          />
        )
      }
      {
        authReducer.token && (
          <Redirect exact from={historyRoutes.login} to={historyRoutes.home} />
        )
      }
    </>
  );
}

UnauthenticatedRouting.propTypes = {
  authReducer: PropTypes.shape(),
};

UnauthenticatedRouting.defaultProps = {
  authReducer: {
    token: null,
  },
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, null)(UnauthenticatedRouting);
