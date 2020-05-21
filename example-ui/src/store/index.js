/* Main import point for redux store.
 * The base versions of pretty much everything exported from here is actually 
 * defined in './store.js'.  This import trick is so that we can have a set of
 * global selectors with access to the finalized selectors without introducing
 * import loops.
 *
 * The only ting actually changed here is the thunkActions, which merge in a
 * local collection to those imported via connected modules.
 */

import {
  actions,
  reducer,
  selectors,
  thunkActions,
} from './store';

/* This chunk of code is to better enable debugging of the UI in development mode.
 * logs out all actions, thunkActions, selectors, and global_selectors and provides
 * window-level access to them.
 *
 * This is split down a bit as past a certain point, js logging stops noting nested 
 * modules as log-able dicts.
 */
// TODO: Lock this to admin mode?
if (window.name !== 'nodejs') {
  console.log({
    actions,
    selectors,
  });
}

export {
  actions,
  reducer as default,
  selectors,
  thunkActions,
};
