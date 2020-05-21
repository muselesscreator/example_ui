/** @module */
import _ from 'lodash';

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Component } from 'components';

import UserPlaque from '../UserPlaque';

import './Authorization.scss';

/**
 * Authorization UI Component
 * Can be accessed as a ref, and accepts a render prop to control its
 * display.
 *
 */
export class Authorization extends Component {
  /**
   * @method
   * Simple callback forward for Auth login method.
   */
  login = () => this.props.login();

  /**
   * @method
   * Simple callback forward for Auth logout method.
   */
  logout = () => this.props.logout();

  /**
   * @method
   * Returns a basic login button
   * @return {JSX} - login button
   */
  loginBtn = () => (<Button onClick={this.login}>Login</Button>);

  /**
   * @method
   * Returns a basic logout button
   * @return {JSX} - logout button
   */
  logoutBtn = () => (<Button onClick={this.logout}>Logout</Button>);

  /**
   * @method
   * Returns true iff a user has been loaded.
   * @return {bool} - has a user been loaded?
   */
  hasUser = () => !!this.props.user;

  /**
   * @method
   * Returns the currently-loaded user profile
   * @return {object} - user profile data.
   */
  userProfile = () => _.get(this.props.user, 'profile');

  /**
   * @method
   * Returns a login button no user is loaded, or else a logout button.
   * @return {JSX} - Authorization controls (login/logout)
   */
  control = () => this.hasUser() ? this.logoutBtn() : this.loginBtn();

  /**
   * @method
   * Returns a default user profile display, but only if a user is loaded
   * @return {JSX} - basic UserPlaque if user is loaded, else null.
   */
  display = () => (
    this.hasUser() 
      ? <UserPlaque profile={this.userProfile()} /> 
      : null
  );

  /**
   * @method
   * Default render method if none is passed
   * @return {JSX} - default authorization UI.
   */
  defaultRender = () => {
    const { className } = this.props;
    return (
      <div className={classNames("auth-navigation", className)}>
        { this.control() }
        { this.display() }
      </div>
    );
  }

  render() {
    if (this.props.render !== undefined) {
      return this.props.render(this);
    }
    return this.defaultRender();
  }
}

Authorization.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      email: PropTypes.string,
    })
  }),
};


export default Authorization;
