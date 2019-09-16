import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../theme/index.scss';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import Routes from './routes';
import Navbar from './ui-kit/navbar';

import reducer from './store/reducer';
import rootSaga from './store/sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// create a redux store with our reducer above and middleware
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
// run the saga
sagaMiddleware.run(rootSaga);

render(
  <section className="hero is-fullheight is-primary">
    <Provider store={store}>
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
