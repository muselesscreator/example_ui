import { components } from 'js-libs/build/redux-test';

import * as module from './DieControl';

import * as variables from 'variables/dice';

import { selectors, actions } from 'store';

jest.mock('store', () => ({
  selectors: {},
  actions: {
    simple_store: {
      addRoll: jest.fn().mockName('addRoll'),
    },
  },
}));

describe('DieControl component', () => {
  describe('Component', () => {
    let mocks = [];
    const mockMethod = (path, impl) => {
      let mock = jest.spyOn(module.DieControl.prototype, path)
        .mockImplementation(impl !== undefined ? impl : () => ({}))
        .mockName(path);
      mocks.push(mock);
    }
    const props = {
      type: variables.diceTypes.d8,
      addRoll: jest.fn().mockName('addRoll'),
      rolls: ['some', 'rolls'],
    };

    afterEach(() => {
      mocks.forEach(mock => mock.mockRestore());
    });

    describe('snapshots', () => {
      beforeEach(() => {
        mockMethod('roll');
      });
      components.simpleTest('smoke test', module.DieControl, props);
    });

    describe('behavior', () => {
      let el, inst;
      beforeEach(() => {
        el = components.render(module.DieControl, props);
        inst = el.instance();
      });
      test('initialState - lastValue should default to undefined', () => {
        expect(el.state().lastValue).toEqual(undefined);
      });
      test('roll', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.999);
        inst.roll();
        expect(el.state().lastValue).toEqual(8);
        expect(props.addRoll).toHaveBeenCalledWith("You rolled a(n) 8 on a d8");
      });
      test('clear rolls on update', () => {
        el.setState({ lastValue: 12 });
        el.setProps({ rolls: [] });
        expect(el.state().lastValue).toEqual(undefined);
      });
    });
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
    test('addRoll - linked to simple_store action', () => {
      expect(props.addRoll).toEqual(actions.simple_store.addRoll);
    });
  });

});

