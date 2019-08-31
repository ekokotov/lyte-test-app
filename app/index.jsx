import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import '../theme/index.scss';

import { configure } from 'mobx';
import Routes from './routes';
import stores from './store';
import Navbar from './ui-kit/navbar';

configure({ enforceActions: 'observed' });

render(
  <section className="hero is-fullheight is-primary">
    <Provider {...stores}>
      <BrowserRouter>
        <Navbar />
        <div className="hero-body">
          <Routes />
        </div>
      </BrowserRouter>
    </Provider>
  </section>,
  document.getElementById('rest-events-root'),
);
