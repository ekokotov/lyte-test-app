import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Events from './events';
import Event from './event';
import PrivateRoute from './private';
import SignIn from './sign-in';
import SignUp from './sign-up';

const Routes = () => (
  <Switch>
    <PrivateRoute path="/event" component={Events} />
    <PrivateRoute path="/event/:id" component={Event} />
    <Route path="/sign-up" component={SignUp} />
    <Route component={SignIn} />
  </Switch>
);

export default Routes;
