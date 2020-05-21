import _ from 'lodash';

import * as module from './connectedSelectors';

/**
 * @callback reduxSelector
 * Takes a redux state object containing a comms data object as first argument
 * @param {object} state - redux store state
 */

/**
 * @callback commsSelector
 * Takes a data object as returned by a comms request as first argument
 * @param {object} data - data block to query
 */

/**
 * @callback connectIterator
 * callback to be passed to a mapValues call, returning a reduxIndexSelector
 * keyed to the configured key
 * @param {commsSelector} selector - comms-format selector to reformat
 * @return {reduxSelector} - redux-format selector
 */

/**
 * @function
 * Map a comms data selector to a redux store selector format.
 * @param {string} path - state path to bind the selector to.
 * @return {connectIterator} - redux-format selector
 */
export const connectSelector = (path) => (selector) => (
  (state, ...args) => selector(_.get(state, path), ...args)
);

/**
 * @function
 * Takes a list of comms selectors and a state key and returns redux selectors
 * corresponding to each comms selector.
 * The expectation is that the object returned by a comms api will be stored directly
 * in that location within the state.
 * Comms libraries should hold all information pertaining to the format of their
 * output, and this util allows you to easily link them to an importing redux store.
 *
 * @param {Object} selectors - object of comms selectors.
 * @param {string} path - tree path for comms data object within local redux state
 * @return {Object} - redux-format selectors for each comms selector passed.
 */
export const connectedSelectors = (selectors, path) => _.mapValues(
  selectors,
  module.connectSelector(path)
);
