import React from 'react';
import { Route } from 'mobx-router';
import Events from './events';
import Event from './event';
import SignIn from './sign-in';
import SignUp from './sign-up';
import EditEvent from './event/edit';

const Routes = {
  home: new Route({
    path: '/',
    component: <Events />,
    onEnter: (router, params, store) => store.EventStore.getEvents(),
  }),
  signUp: new Route({
    path: '/sign-up',
    component: <SignUp />,
    onExit: (router, params, store) => store.AuthStore.clearErrors,
  }),
  signIn: new Route({
    path: '/sign-in',
    component: <SignIn />,
    onExit: (router, params, store) => store.AuthStore.clearErrors,
  }),
  event: new Route({
    path: '/event/:eventId',
    component: <Event />,
    beforeEnter: (router, params, store) => store.EventStore.getById(params.eventId),
  }),
  eventEdit: new Route({
    path: '/event/:eventId/edit',
    component: <EditEvent />,
    beforeEnter(router, params, store) {
      if (!store.AuthStore.token) {
        store.AuthStore.redirectToLogin();
        return false;
      }
      store.EventStore.getById(params.eventId);
    },
  }),
};
export default Routes;
