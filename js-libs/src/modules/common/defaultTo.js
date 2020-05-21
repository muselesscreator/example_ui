/** @module */

import _ from 'lodash';

/**
 * @callback defaultToEvalCb
 * @return - computed value.
 */

/**
 * This utility function is meant to give a way of assigning
 * a variable based on whether a given value is undefined or null.
 *
 * For cases of:
 *   let val = thing !== undefined ? thing : other_thing;
 * you would use:
 *   let val = defaultTo(thing, other_thing)
 *
 * If you are checking for undefined because you need to DO something with
 * the checked value, you can include a function to be evaluated at call-time.
 * The output of that function is what will be returned if the value is defined.
 *   let val = thing !== undefined ? Math.max(thing.lists[2]) : thing_2;
 *   let val = defaultTo(thing, thing_2, () => Math.max(thing.lists[2]))
 *
 * @function
 * @param checkValue - value to be evaluated as defined or undefined.
 *   This value will be returned if it is not undefined, and
 *   valueFn is not included.
 * @param defaultValue - value to be returned if checkValue is undefined.
 * @param [valueFn] {defaultToEvalCb} - function to be called if checkValue
 *   is defined.  Its output will be returned if checkValue is defined.
 * @return - If checkValue is undefined, this returns the default value.
 *   Otherwise checkValue is returned, unless valueFn is included, in which case
 *   its output is returned.
 */
export const defaultTo = (checkValue, defaultValue, valueFn) => {
  if ((checkValue == null)) {
    return defaultValue;
  }
  if (_.isUndefined(valueFn)) {
    return checkValue;
  }
  return valueFn();
};

export default defaultTo;
