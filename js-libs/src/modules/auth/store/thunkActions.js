/** @module */
import Auth from '../comms';
import { actions } from 'store';

/**
 * @callback thunkAction
 * @param {function} dispatch - redux dispatch method
 */

/**
 * @function
 * Handles an Auth0 callback, dispatching the appropriate feedback to the
 * auth store.
 * @return {thunkAction} - Auth0 callback handler
 */
export const handleAuthCallback = () => (dispatch, getState, { authConfig }) => {
  console.log({ authConfig });
  return Auth.handleAuth(authConfig).then(
    user => dispatch(actions.auth.userProfileLoaded(user))
  )
};

/**
 * @function
 * Calls the auth0 login function
 * @return {thunkAction} - auth0 login trigger
 */
export const login = () => (dispatch, getState, { authConfig }) => {
  console.log({ authConfig });
  return Auth.login(authConfig);
};

/**
 * @function
 * Calls the auth0 logout function
 * @return {thunkAction} - auth0 logout trigger
 */
export const logout = () => (dispatch, getState, { authConfig }) => Auth.logout(authConfig);
