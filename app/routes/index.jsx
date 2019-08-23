import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventList from './event-list';
import Event from './event';
import PrivateRoute from './private';
import SignIn from './sign-in';
import SignUp from './sign-up';

const Routes = () => (
  <Switch>
    <Route path="/login" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
    <PrivateRoute path="/events" component={EventList} />
    <PrivateRoute path="/event/:id" component={Event} />
  </Switch>
);

export default Routes;
