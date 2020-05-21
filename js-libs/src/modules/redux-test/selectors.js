/* globals it, expect */

import PropTypes from 'prop-types';

export const listData = ['a thing', 'another thing'];

// Tests simpleSelectors.
export const testSelectors = (selectors, keys) => {
  keys.forEach(key => {
    const selector = selectors[key];
    it(`returns the ${key} from the passed state`, () => {
      expect(selector({ test: 'asdf', [key]: listData })).toEqual(listData);
    });
  });
};
testSelectors.propTypes = ({
  selector: PropTypes.func.isRequired,
  prop: PropTypes.string.isRequired
});

export default testSelectors;
