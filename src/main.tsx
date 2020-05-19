import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from 'app/store';
import { Router } from 'react-router';

import { App } from './app';

// prepare store
const history = createBrowserHistory();
const store = configureStore();

// https://www.figma.com/file/Ysf6WitzWKsZwncuTnznXN/Untitled?node-id=1%3A140

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
