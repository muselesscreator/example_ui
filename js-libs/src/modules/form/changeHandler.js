/** @module */
import _ from 'lodash';

import { defaultTo } from 'modules/common';

/**
 * @callback changeHandler_creator
 * @param {string} path - path to be set in the state with the new value.
 * @return {changeHandler} - changeHandler
 */

/**
 * @callback changeHandler
 * @param {Object} e - event object
 * @param {Object} [data] - secondary data object passed w/ some events
 */

/**
 * Form change handler
 * Takes a component to instantiate into.
 * Returns a handler-creator, which takes a path and returns an event
 * handler which can respond to a number of different types of input events.
 *
 * The returned changeHandler will put the appropriate value at the passed path
 * in the component's state;
 *
 * @function
 * @param {Component} component - parent form component
 * @return {changeHandler_creator} - changeHandler creator
 */
export const changeHandler = (component) => (
  (path) => (e, data) => {
    const state = { ...component.state };
    const val = defaultTo(data, e, () => data.value);
    _.set(state, path, val);
    component.setState(state);
  }
);

export default changeHandler;
