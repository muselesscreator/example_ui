import { testActions, testSelectors } from 'js-libs/build/redux-test';

import * as module from './simple_store';


describe('simple_store redux store module', () => {
  describe('actions', () => {
    testActions(module.actions, {
      addRoll: ['roll'],
      clearRolls: [],
    });
  });
  describe('actionHandlers', () => {
    const { actionHandlers } = module;
    const state = { ...module.initialState };
    const roll = "A new roll";
    const oldRoll = "an old roll";
    test('addRoll - adds a new roll string to the list', () => {
      const oldState = { ...state, rolls: [oldRoll] };
      expect(
        actionHandlers.addRoll(oldState, { roll })
      ).toEqual(
        { ...state, rolls: [oldRoll, roll] }
      )
    });
    test('clearRolls - clears rolls list', () => {
      const oldState = { ...state, rolls: [oldRoll, roll] };
      expect(actionHandlers.clearRolls(oldState)).toEqual({ ...state, rolls: [] });
    });
  });

  describe('selectors', () => {
    testSelectors(module.selectors, Object.keys(module.initialState));
  });
});
