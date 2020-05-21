/* globals it, expect */

import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import * as _ from 'lodash';

import { defaultTo } from 'modules/common';

// Components
export const render = (Component, props) => {
  return shallow(<Component {...props} />);
};
render.propTypes = ({
  Component: PropTypes.element.isRequired,
  props: PropTypes.objectOf(PropTypes.node).isRequired
});

export const snapshotTest = tree => {
  expect(toJson(tree)).toMatchSnapshot();
};

export const simpleTest = (name, Component, props) => {
  test('snapshot' + name ? `:${name}` : '' , () => {
    snapshotTest(render(Component, props));
  });
}
simpleTest.propTypes = ({
  name: PropTypes.string.isRequired,
  Component: PropTypes.node.isRequired,
  props: PropTypes.object,
});

// mapStateToProps
export const mockSelectors = (selectors, toMock) => {
  Object.keys(toMock).forEach(key => {
    _.set(
      selectors,
      toMock[key],
      jest.fn((...props) => ([ ...props ]))
    );
  });
}
mockSelectors.propTypes = ({
  selectors: PropTypes.object.isRequired,
  toMock: PropTypes.objectOf(PropTypes.string),
});

export const testSelector = (selectorProp, args) => {
  expect(selectorProp).toEqual({ ...args });
};

export const testSelectors = (mapStateToProps, ownProps, selectors, pathMap, argsMap) => {
  mockSelectors(selectors, pathMap);
  const state = 'stATe';
  const props = mapStateToProps(state, ownProps);
  Object.keys(argsMap).forEach(prop => {
    expect(props[prop]).toEqual(state, ...argsMap[prop])
  });
}

/**
 * @callback mapStateToProps
 * @param {object} state - current redux store state
 */

/**
 * @function
 * Tests simple selector-prop connections in a mapStateToProps function.
 *
 * Takes a mapStateToProps connect method, along with the base selectors collection
 * from the redux store, and an object containing a mapping of used selectors, keyed
 * by their returned prop name.
 *
 * @param {mapStateToProps} mapStateToProps - component mapStateToProps function.
 * @param {object} selectors - base redux store.selectors
 * @param {object} pathMap - { <prop name>: <selector path> }
 * @param {object=} argsMap - { <prop name>: [<selector args>] }
 * @param {object=} ownProps - optional ownProps object
 */
export const testStateToProps = (mapStateToProps, selectors, pathMap, argsMap={}, ownProps={}) => {
  mockSelectors(selectors, pathMap);
  const state = { field: 'FieLD' };
  const props = mapStateToProps(state, ownProps);
  Object.keys(pathMap).forEach(key => {
    if (argsMap[key] === undefined) {
      expect(props[key]).toEqual([state]);
    }
    else {
      expect(props[key]).toEqual([state, ...argsMap[key]])
    }
  });
};
testStateToProps.propTypes = ({
  mapStateToProps: PropTypes.func.isRequired,
  selectors: PropTypes.object.isRequired,
  pathMap: PropTypes.object.isRequired,
  argsMap: PropTypes.object,
  ownProps: PropTypes.object,
});

// mapDispatchToProps
export const mockActions = (actions, toMock) => {
  toMock.map(actionPath => _.set(actions, actionPath, jest.fn((...props) => [...props])));
}
mockActions.propTypes = {
  actions: PropTypes.object,
  toMock: PropTypes.arrayOf(PropTypes.string),
};
