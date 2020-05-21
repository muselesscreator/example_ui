/* globals it, expect */

import _ from 'lodash';

// Action Tests
export const testActions = (actions, fnKeys) => {
  test('all action types are unique', () => {
    const types = Object.keys(actions).map(action => actions[action].type);
    expect(_.uniq(types)).toEqual(types);
    expect(_.every(types, (type) => typeof type === 'string')).toEqual(true);
  });
  Object.keys(fnKeys).forEach(actionKey => {
    describe(actionKey, () => {
      it('forwards the correct arguments to the action', () => {
        const fn = actions[actionKey].fn,
              props = fnKeys[actionKey];
        const expected = props.reduce((obj, prop) => ({ ...obj, [prop]: prop }), {})
        expect(fn(...props)).toEqual(expected);
      });
    });
  });
};

export default testActions;
