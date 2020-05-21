import { connectReducers } from 'js-libs/build/redux';

import * as simple_store from './modules/simple_store';

const {
  thunkActions: _thunkActions, actions, reducer, selectors
} = connectReducers({
  simple_store,
});

export {
  actions,
  reducer,
  selectors
};
export const thunkActions = { ..._thunkActions };
