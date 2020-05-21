import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// Re-enable if you think you have spurrious react updates affecting performance.
// import { whyDidYouUpdate } from 'why-did-you-update';

import 'typeface-roboto';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import 'semantic-ui-css/semantic.min.css'
import 'animate.css/animate.min.css';

import reducer from 'store';
import loadDevControls from './dev';
import App from './App';

// Set to false to enable per-action logging for debugging purposes.
const noLogger = true;

const actionBlackList = [ ]

const logger = createLogger({
  // update if you want to trim/modify the raw redux store in some way before logging.
  stateTransformer: (state) => ({ ...state }),
  predicate: (getState, action) => (actionBlackList.indexOf(action.type) === -1),
  collapsed: (getState, action, logEntry) => !logEntry.error,
});

/**
 * put global complex objects in here to be accessed by thunk actions as an extra
 * argument.
 * i.e. - const thunkAction = (dispatch, getState, { ws }) => { ... }
 */
const globals = {
//  ws: new MyWebSocketConnection(),
}
const thunkInstance = thunk.withExtraArgument(globals);

let middleware = (process.env.NODE_ENV === "development" && !noLogger)
  ? applyMiddleware(thunkInstance, logger)
  : applyMiddleware(thunkInstance);

const store = createStore(reducer, compose(middleware));

/**
 * Load dev-controls that make the redux architecture accessible from
 * the console.
 */
loadDevControls(store);

ReactDOM.render(
  <Provider store={store}>
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById('root')
);
