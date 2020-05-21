/** @module */

import _ from 'lodash';

import { defaultTo } from 'modules/common';

/**
 * Returns the JSON-parsed value of stored in localStorage at the given key,
 * defaulting to defaultVal if nothing is stored there.
 *
 * @function
 * @param {string} key - localStorage key to query
 * @param defaultVal - default value to return
 * @return - JSON-Parsed output of the store value.
 */
export const localStorageValue = (key, defaultVal) => {
  const lsVal = localStorage.getItem(key);
  return defaultTo(lsVal, defaultVal, () => JSON.parse(lsVal));
}

/**
 * Save an object to localStorage, with a shared prefix for all keys.
 * Each value is JSON.stringify-ed for storage.
 *
 * @function
 * @param {Object} state - state object to add to localStorage
 * @param {string} ns - namespace string to prepend to each key in <state>.
 */
export const save = (state, ns) => {
  Object.keys(state).forEach(key => {
    localStorage.setItem(ns + '.' + key, JSON.stringify(state[key]));
  });
}

/**
 * Factory for a connectReducers mapping that applies changes
 * to localStorage.
 *
 * @function
 * @param {Object} mapping - store module mapping.
 * @return {Object} - store module mapping, with reducers updated to
 *   apply changes to localStorage.
 */
export const localStorageConnect = (mapping) => _.mapValues(mapping, (module, ns) => {
  // any non-truthy value is ignorable here, including 0 and empty strings.
  const initialState = _.mapValues(
    module.initialState,
    (val, key) => localStorageValue(ns + '.' + key, val)
  );
  const reducer = (state=initialState, action) => {
    let newState = module.reducer(state, action);
    if (JSON.stringify(state) !== JSON.stringify(newState)) {
      save(newState, ns);
    }
    return newState;
  }
  return { ...module, initialState, reducer };
});

export default localStorageConnect;
