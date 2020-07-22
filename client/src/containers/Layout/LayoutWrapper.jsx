import React from 'react';
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import ProfilePage from '../Profile/ProfilePage';
import NoMatch from '../../shared/components/NoMatch';

const LayoutWrapper =(props) => {
  return(
    <>
      <NavBar />
      <div className="Compact" style={{ marginTop: '80px' }}>
        <Switch>
          <Route exact path="/:username" component={ProfilePage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </>
  );
};

export default LayoutWrapper;
