import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import '../theme/index.scss';

import { configure } from 'mobx';
import { MobxRouter, startRouter } from 'mobx-router';
import Routes from './routes';
import stores from './store';
import Navbar from './ui-kit/navbar';

configure({ enforceActions: 'observed' });

startRouter(Routes, stores);

render(
  <section className="hero is-fullheight is-primary">
    <Provider {...stores}>
      <Navbar />
      <div className="hero-body">
        <MobxRouter store={stores} />
      </div>
    </Provider>
  </section>,
  document.getElementById('rest-events-root'),
);
