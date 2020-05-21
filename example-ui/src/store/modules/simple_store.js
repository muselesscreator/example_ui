/**
 * Simple example redux store with js-libs.
 * Tracks a list of D&D dice rolls.
 */
import { StrictDict } from 'js-libs/build/common';
import { action, connectHandlers, mkReducer, simpleSelectors } from 'js-libs/build/redux';

export const initialState = {
  rolls: [],
}

export const actions = StrictDict({
  /**
   * Add a new roll string to the rolls list
   * @param {string} roll - new roll string
   */
  addRoll: action('ADD_ROLL', ['roll']),
  /**
   * Clear all rollsf rom the rolls list.
   */
  clearRolls: action('CLEAR_ROLLS', []),
});

export const actionHandlers = {
  addRoll: (state, { roll }) => ({ ...state, rolls: [...state.rolls, roll] }),
  clearRolls: (state) => ({ ...state, rolls: [] }),
}

export const reducer = mkReducer(
  initialState,
  connectHandlers(actions, actionHandlers),
);

export const selectors = StrictDict({
  ...simpleSelectors(initialState),
});
