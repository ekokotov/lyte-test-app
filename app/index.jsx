import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import '../theme/index.scss';

import { configure } from 'mobx';
import Routes from './routes';
import stores from './store';

configure({ enforceActions: 'observed' });

render(
  <Provider {...stores}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>, document.getElementById('rest-events-root'),
);
