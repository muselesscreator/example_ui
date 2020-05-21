/** @module */
import { action, mkReducer } from 'modules/redux';
import { StrictDict } from 'modules/common';
import { connectedSelectors } from './connectedSelectors';

import * as module from './store';

export const simpleStore = ({
  key,
  actions,
  commsSelectors,
  reducerFunctions,
  selectors,
}) => ({
  initialState: module.initialState(key),
  actions: module.actions(key, actions),
  reducer: module.reducer(key, reducerFunctions),
  selectors: module.mkSelectors(key, { ...commsSelectors, ...selectors }),
})


export const initialState = (key) => ({ [key]: {} });

/**
 * load action creator
 * @param {string} key - module key
 * @return {object} - load action creator object
 */
export const loadAction = (key) => action('LOAD', [key]);

export const actions = (key, extraActions) => StrictDict({
  load: module.loadAction(key),
  ...extraActions,
});

export const handleLoad = (key) => (
  (state, action) => ({
    ...state,
    [key]: action[key],
  })
);

/**
 * @callback reducer
 * @param {object} state - redux state
 * @param {object} action - redux action being handled
 * @return {object} - new redux state
 */

/**
 * generates a reducer given a module key and an object of additional/overloaded
 * actions handler functions.
 * @param {string} key - module key
 * @param {object} [reducerFunctions] - extra action handlers and/or an overload for
 *   handling the load action
 * @return {reducer} - comms-connected reducer function
 */
export const reducer = (key, reducerFunctions) => mkReducer(
  module.initialState(key),
  { 
    [module.loadAction(key).type]: module.handleLoad(key),
    ...reducerFunctions,
  }
);

/**
 * @function
 * Generates selectors.  In a function so that conenctedSampleSelectors
 * can be mocked out for testing.
 */
export const mkSelectors = (key, commsSelectors) => ({
  list: (state) => state[key],
  /**
   * Return a given order based on its index/order_id
   * @param {string} index - order index
   */
  atIndex: (state, index) => state[key][index],
  ...connectedSelectors({ ...commsSelectors }, key),
});

export default simpleStore;
