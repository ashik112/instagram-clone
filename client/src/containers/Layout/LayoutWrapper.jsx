import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProfilePage from '../Profile/ProfilePage';
import NoMatch from '../../shared/components/NoMatch';
import HomePage from '../Home/HomePage';

const LayoutWrapper = () => (
  <>
    <NavBar />
    <div className="Compact" style={{ marginTop: '80px' }}>
      <Switch>
        <Route exact path="/:username" component={ProfilePage} />
        <Route exact component={HomePage} path="/" />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </>
);

export default LayoutWrapper;
