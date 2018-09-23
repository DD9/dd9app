/**
 * Set default authentication properties to load initial state.
 * Non-authed & Non-admin users will still be redirected from pages on second render.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(
  reducers,
  {
    auth: {
      _id: localStorage.getItem('token'),
      permissions: [{ admin: true }],
    },
  },
  applyMiddleware(reduxThunk),
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root'),
);
