import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Events from './events';
import Event from './event';
import PrivateRoute from './private';
import SignIn from './sign-in';
import SignUp from './sign-up';
import EditEvent from './edit-event';

const Routes = () => (
    <Switch>
        <Route path="/event/:id" component={Event} />
        <PrivateRoute path="/event/:id/edit" component={EditEvent} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route component={Events} />
    </Switch>
);

export default Routes;
