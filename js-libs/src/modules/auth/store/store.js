import { action, mkReducer, simpleSelectors } from 'modules/redux';
import { StrictDict } from 'modules/common';

import Auth from '../comms';
import * as thunkActions from './thunkActions';

export const initialState = {
  user: null,
  parseHash: null,
};

export const actions = StrictDict({
  userProfileLoaded: action('USER_PROFILE_LOADED', ['user']),
  handleAuthCallback: action('HANDLE_AUTH_CALLBACK', ['parseHash']),
});

export const reducer = mkReducer(initialState, {
  [actions.userProfileLoaded.type]: (state, { user }) => ({ ...state, user }),
  [actions.handleAuthCallback.type]: (state, { parseHash }) => ({ ...state, parseHash }),
});

export const selectors = {
  ...simpleSelectors(initialState),
  isAuthenticated: ({ user }) => user !== null,
  userName: ({ user }) => user !== null ? Auth.selectors.userName(user) : null,
};

export { thunkActions };
