import React from 'react';
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import ProfilePage from '../Profile/ProfilePage';
import NoMatch from '../../shared/components/NoMatch';

const LayoutWrapper =(props) => {
  return(
    <>
      <div className="mb-5">
        <NavBar />
      </div>
      <div className="Compact p-lg-5">
        <Switch>
          <Route exact path="/:username" component={ProfilePage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </>
  );
};

export default LayoutWrapper;
