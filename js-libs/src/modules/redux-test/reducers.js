import _ from 'lodash';

import PropTypes from 'prop-types';

/**
 * @callback reducerFunc
 * @param {object} state - current redux store state
 * @param {object} action - redux action being handled
 * @return {object} outgoing state.
 */

/**
 * @function
 * Define a test suite for a redux reducer.
 *
 * @param {func} reducer - reducer function to test
 * @param {object} initialState - initial redux store state
 * @param {object[]} reducerTests - array of "tests" to run, each containing
 *   an action definition, a list of action args, an optional label string,
 *   and an initial and expected state.
 */
export const testReducer = (reducer, initialState, reducerTests) => {
  it('loads initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  reducerTests.forEach(test => {
    const { action, args=[], state, expected, label='' } = test;
    let testStr = `reacts to ${test.action.type} action type`;
    if (label !== '') {
      testStr = `${testStr}: ${label}`;
    }
    it(testStr, () => {
      const { type, fn } = action;
      const out = fn(...args);
      expect(reducer(state, { ...out, type })).toEqual(expected);
    });
  });
};
testReducer.propTypes = ({
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.func.isRequired,
  tests: PropTypes.arrayOf({
    action: PropTypes.shape({
      type: PropTypes.string.isRequired,
      fn: PropTypes.func.isRequired,
    }).isRequired,
    args: PropTypes.arrayOf(PropTypes.any).isRequired,
    expected: PropTypes.object.isRequired,
    label: PropTypes.string,
    state: PropTypes.any.isRequired,
  }).isRequired,
});

const obj = { an: 'object' };
const initial = { a: 'state', and: 'stuff' };
export const tests = {
  /**
   * @function
   * Test a partial update reducer function.
   * Provide the tested action, a target path, a set of action args,
   * and an expected merge value to be added to an object at the
   * given path.
   *
   * @param {object} action - { type, fn } action definition
   * @param {string} path - _.set-able path string ('field', 'field.group[0]', etc)
   * @param {array} args - list of action arguments
   * @param {object} expectedMerge - expected data to merge into the given field.
   * @param {string=} label - optional test label string
   * @return {object} - test object suitable for testReducer usage
   */
  objPartial: (action, path, args, expectedMerge, label) => {
    const state = { ...initial };
    const expected = { ...initial };
    _.set(state, path, obj);
    _.set(expected, path, { ...obj, ...expectedMerge });
    return { action, args, state, expected, label };
  },
};

export default testReducer;
