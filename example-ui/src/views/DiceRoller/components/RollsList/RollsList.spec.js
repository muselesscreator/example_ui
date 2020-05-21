import { components } from 'js-libs/build/redux-test';

import * as module from './RollsList';

import { selectors, actions } from 'store';

jest.mock('store', () => ({
  selectors: {},
  actions: {
    simple_store: {
      clearRolls: jest.fn().mockName('clearRolls'),
    },
  },
}));

describe('RollsList component', () => {
  describe('Component', () => {
    const props = {
      clearRolls: jest.fn().mockName('clearRolls'),
      rolls: ['some', 'rolls'],
    };
    components.simpleTest('smoke test', module.RollsList, props);
  });
  describe('mapSateToProps', () => {
    components.testStateToProps(
      module.mapStateToProps,
      selectors,
      {
        rolls: 'simple_store.rolls',
      }
    );
  });
  describe('mapDispatchToProps', () => {
    const { mapDispatchToProps: props } = module;
    test('clearRolls - linked to simple_store action', () => {
      expect(props.clearRolls).toEqual(actions.simple_store.clearRolls);
    });
  });
});

