/** @module */
import React from 'react';
import { Redirect } from 'react-router';

import { selectors, thunkActions } from 'store';

/**
 * Callback routing component, responsible for checking an incoming
 * auth response callback for a user profile, and attempting to load it.
 * Displays a default loading view while loading a response.
 * @param {object} user - current user designation
 * @param {function} handleAuth - auth callback handler
 */
export const Callback = ({ user, handleAuth, render }) => {
  if (user) return (<Redirect to ="/" />);
  handleAuth();
  if (render !== undefined) {
    return render();
  }
  return (
    <div className="auth-callback">
      Loading user profile.
    </div>
  )
}


export const mapStateToProps = (state) => ({
  user: selectors.auth.user(state),
});

export const mapDispatchToProps = (dispatch) => ({
  handleAuth: () => dispatch(thunkActions.auth.handleAuthCallback()),
});

export default Callback;
