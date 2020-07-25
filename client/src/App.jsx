import React from 'react';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from './utils/history';
import LoginPage from './containers/Login/LoginPage';
import LayoutWrapper from './containers/Layout/LayoutWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import './shared/styles/styles.scss';
import UnauthenticatedRouting from './routing/UnauthenticatedRouting';

// eslint-disable-next-line react/prop-types
const App = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Switch>
          <UnauthenticatedRouting exact component={LoginPage} path="/login" />
          <LayoutWrapper />
        </Switch>
      </Router>
    </PersistGate>
    <ToastContainer />
  </Provider>
);
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, null)(App);
