/**
 *  Place for dev-specific modules/methods to expose to the console.
 */
import { actions, selectors, thunkActions } from 'store';

export const loadDevControls = (store) => {
  window.actions = actions;
  window.selectors = selectors;
  window.thunkActions = thunkActions;
  window.store = store;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
}

export default loadDevControls;
