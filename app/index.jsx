import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import '../theme/index.scss';

import { configure } from 'mobx';
import Routes from './routes';
import stores from './store';

configure({ enforceActions: 'observed' });

render(
  <section className="hero is-fullheight is-primary">
    <div className="hero-body">

      <Provider {...stores}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>

    </div>
  </section>,
  document.getElementById('rest-events-root'),
);
