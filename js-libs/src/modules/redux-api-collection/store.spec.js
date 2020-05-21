import _ from 'lodash';
import * as connectedSelectors from './connectedSelectors';
import * as reduxUtils from 'modules/redux';

import {
  testActions,
  testSelectors
} from 'modules/redux-test';

import * as module from './store';

jest.mock('modules/redux', () => ({
  mkReducer: jest.fn((initial, handlers) => ({ initial, handlers })),
}));

const localMock = (methodName, newFn) => (
  jest.spyOn(module, methodName).mockImplementation(newFn)
);

describe('comms store creator util', () => {
  const key = 'WonkyCollection';

  describe('simpleStore', () => {
    let actions, initialState, reducer, mkSelectors, store;
    const args = {
      key,
      actions: { action1: 'a thing', action2: 'another thing' },
      commsSelectors: { csel1: jest.fn(), csel2: jest.fn() },
      reducerFunctions: { red1: jest.fn(), red2: jest.fn() },
      selectors: { sel1: jest.fn(), sel2: jest.fn() },
    };
    beforeEach(() => {
      actions = localMock('actions', (key, actions) => ({ key, actions }));
      initialState = localMock('initialState', (key) => ({ key }));
      reducer = localMock('reducer', (key, reducerFunctions) => ({ key, reducerFunctions }));
      mkSelectors = localMock('mkSelectors', (key, selectors) => ({ key, selectors }))
      store = module.simpleStore(args);
    });
    afterEach(() => {
      actions.mockRestore();
      initialState.mockRestore();
      reducer.mockRestore();
      mkSelectors.mockRestore();
    });
    test('sets initial state from key', () => {
      expect(store.initialState).toEqual({ key });
      expect(initialState).toHaveBeenCalledWith(key);
    });
    test('sets actions with key and passed actions', () => {
      expect(store.actions).toEqual({ key, actions: args.actions });
      expect(actions).toHaveBeenCalledWith(key, args.actions);
    });
    test('sets reducer with key and passed reducer functions', () => {
      expect(store.reducer).toEqual({ key, reducerFunctions: args.reducerFunctions });
      expect(reducer).toHaveBeenCalledWith(key, args.reducerFunctions);
    });
    test('sets selectors with key and passed comms selectors and manual selectors', () => {
      const expSelectors = { ...args.commsSelectors, ...args.selectors };
      expect(store.selectors).toEqual({ key, selectors: expSelectors });
      expect(mkSelectors).toHaveBeenCalledWith(key, expSelectors);
    });
  })
  describe('initialState', () => {

  });
  describe('actions', () => {
    let loadAction, output;
    const extra = {
      also: 'this',
    };
    beforeEach(() => {
      loadAction = jest.spyOn(module, 'loadAction').mockImplementation(
        (key) => ({ load: key }),
      );
      output = module.actions(key, extra);
    });
    afterEach(() => {
      loadAction.mockRestore();
    });
    it('links the load action to module.loadAction(key)', () => {
      expect(output.load).toEqual(loadAction(key));
    });
    it('includes all extra actions', () => {
      expect(output.also).toEqual(extra.also);
    });
  });

  describe('reducer', () => {
    const data = [
      { thing: 1, index: 'blah' },
      { thing: 2, index: 'bluh' },
    ];
    const extraHandlers = {
      handle1: jest.fn(),
      handle2: jest.fn(),
    };

    let initialState, handleLoad, loadAction;

    beforeEach(() => {
      initialState = jest.spyOn(module, 'initialState').mockImplementation(
        (key) => ({ [key]: [] })
      );
      handleLoad = jest.spyOn(module, 'handleLoad').mockImplementation(
        (key) => ({ load: key })
      );
      loadAction = jest.spyOn(module, 'loadAction').mockImplementation(
        (key) => ({ type: key })
      );
    });

    afterEach(() => {
      initialState.mockRestore();
      loadAction.mockRestore();
    });

    test('mkReducer called with base initial state', () => {
      const reducer = module.reducer(key, extraHandlers);
      expect(reducer).toEqual({
        initial: initialState(key),
        handlers: { [key]: handleLoad(key), ...extraHandlers },
      });
    });
  });


  describe('mkSelectors', () => {
    let mockConnectedSelectors;
    const testKey = 'teST';
    const value = 'VALue!!!';
    const commsSelectors = { comms: jest.fn(), SELectors: jest.fn() };
    const _connectedSelectors = { some: jest.fn(), selectors: jest.fn() };
    let output;
    beforeEach(() => {
      mockConnectedSelectors = jest.spyOn(
        connectedSelectors,
        'connectedSelectors'
      ).mockImplementation((selectors) => _connectedSelectors);
      output = module.mkSelectors(key, commsSelectors);
    });
    afterEach(() => {
      mockConnectedSelectors.mockRestore();
    });
    test('mkSelectors connectedSelectors', () => {
      expect(output.some).toEqual(_connectedSelectors.some);
      expect(output.selectors).toEqual(_connectedSelectors.selectors);
      expect(mockConnectedSelectors).toHaveBeenCalledWith(commsSelectors, key);
    });
    test('list selector returns the value at the module key', () => {
      expect(output.list({ [key]: value })).toEqual(value);
    });
    test('atIndex returns value from data at given index', () => {
      expect(
        output.atIndex({ [key]: { [testKey]: value } }, testKey)
      ).toEqual(value);
    });
  });

});
