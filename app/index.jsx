import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import '../theme/index.scss';

import { configure } from 'mobx';
import stores from './store';
import SignIn from './routes/sign-in';
import SignUp from './routes/sign-up';
import PrivateRoute from './routes/private';
import EventList from './routes/event-list';
import Event from './routes/event';

configure({ enforceActions: 'observed' });

render(
  <Provider {...stores}>
    <BrowserRouter>
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute path="/event" component={EventList} />
        <PrivateRoute path="/event/:id" component={Event} />
      </Switch>
    </BrowserRouter>
  </Provider>, document.getElementById('rest-events-root'),
);
