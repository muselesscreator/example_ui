/** @module */

import _ from 'lodash';

import * as validators from './validators';

/**
 * Returns error if empty string or undefined
 * 
 * @function
 * @param val - value to check
 * @param label - data value label to display in error
 * @return {Object} - error response
 */
export const empty = (val, label) => {
  return (val === '' || val === undefined)
    ? { error: true, message: validators.emptyMessage(label) }
    : { error: false };
}
export const emptyMessage = (label) => `${label} required`;

/**
 * Returns error if contains invalid characters for a name field
 * 
 * @function
 * @param val - value to check
 * @param label - data value label to display in error
 * @return {Object} - error response
 */
export const nameChars = (val, label) =>
  (!/^[0-9a-z_]*$/.test(val)) 
    ? { error: true, message: validators.nameCharsMessage(label)}
    : { error: false };

export const nameCharsMessage = (label) => `${label} can only contain [a-z, 0-9, _]`;

export const maxLength = (val, label, max) => {
  return (val.length >= max)
    ? { error: true, message: validators.maxLengthMessage(label, max) }
    : { error: false };
}

export const maxLengthMessage = (label, max) => `${label} must have a max length of ${max}`;

export const emptyFields = (val, label) => {
  return (_.every(Object.values(val), v => v !== ''))
    ? { error: false }
    : { error: true, message: validators.emptyFieldsMessage(label) }
};

export const emptyFieldsMessage = (label) => `${label} should not have any missing fields`;

/**
 * Returns a compiled error object from a list of errors
 * duplicates have their messages appended to a list for that error type.
 *
 * @function
 * @param {Object[]} errors - list of error responses
 * @return {Object} - error response
 */
export const reduceErrors = (errors) => {
  let error = _.some(errors, (e) => e.error);
  if (!error) {
    return { error };
  }
  return {
    error,
    messages: errors.filter(e => e.error).reduce(
      (obj, e) => e.message ? [ ...obj, e.message ] : [ ...obj, ...e.messages],
      []
    ),
  };
}

/**
 * Returns compiled errors from empty and nameChars validators.
 * 
 * @function
 * @param val - value to check
 * @param label - data value label to display in error
 * @return {Object} - error response
 */
export const name = (val, label) => {
  return validators.reduceErrors([
    validators.empty(val, label),
    validators.nameChars(val, label)
  ]);
}
