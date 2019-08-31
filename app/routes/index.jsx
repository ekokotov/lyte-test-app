import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Events from './events';
import Event from './event';
import PrivateRoute from './private';
import SignIn from './sign-in';
import SignUp from './sign-up';
import EditEvent from './event/edit';

const Routes = () => (
  <Switch>
    <PrivateRoute path="/event/:eventId/edit" component={EditEvent} />
    <Route path="/event/:eventId" component={Event} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/event" component={Events} />
    <Redirect to="/event" />
  </Switch>
);

export default Routes;
