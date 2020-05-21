/** @module */
import auth0 from 'auth0-js';

import * as Auth from './Auth';

/**
 * Creates an authClient, given an object containing the auth0 credentials.
 *
 * responseType: `token id_token` provides necessary authentication tokens for different
 * types of authConfigs, such as the ClientSampleAPI config.
 *   `token` provides an anonymous accessToken, while `id_token` provides an idToken w/
 *   payload (containing user info) and expiration time.
 *
 * @param {object} - auth0 config containing the ['domain', 'clientID', 'callbackUrl']
 *    for the configured connection.
 * @return - Auth0 Client;
 */
export const mkClient = ({ domain, clientID, callbackUrl, audience }) => new auth0.WebAuth({
  audience,
  domain,
  clientID,
  redirectUri: callbackUrl,
  responseType: 'token id_token',
  scope: 'openid profile email'
});

/**
 * @function
 * Handles an auth response from the server, returning a promise
 * that resolves with a positive response on completion.
 * @param {object} config - auth0 configuration
 * @return {Promise} - Returns the shape
 *   ```
 *   { authenticated, idToken, profile, expiresAt, prompt }
 *   ```
 */
export const handleAuth = (config) => new Promise ((resolve, reject) => {
  Auth.mkClient(config).parseHash((err, authResult) => {
    if (err) return reject(err);
    if (!authResult || !authResult.idToken) {
      return reject(err);
    }
    console.log({ authResult })
    const accessToken = authResult.accessToken;
    const idToken = authResult.idToken;
    const profile = authResult.idTokenPayload;
    const expiresAt = authResult.idTokenPayload.exp * 1000;
    resolve({
      authenticated: true,
      accessToken,
      idToken,
      profile,
      expiresAt,
      prompt: 'none',
    });
  });
});

/**
 * @function
 * Triggers the Auth0 login procedure
 * @param {object} config - auth0 configuration
 */
export const login = (config) => Auth.mkClient(config).authorize();

/**
 * @function
 * Triggers the Auth0 logout procedure
 * @param {object} config - auth0 configuration
 */
export const logout = (config) => Auth.mkClient(config).logout({
  returnTo: config.returnUrl,
  clientID: config.clientID,
});

/**
 * selectors
 */
export const selectors = {
  userName: (authResult) => authResult.profile.name,
}
