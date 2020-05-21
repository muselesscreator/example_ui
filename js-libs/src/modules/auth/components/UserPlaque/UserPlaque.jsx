/** @module */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ValueLabel } from 'components';

import './UserPlaque.scss';

/**
 * Display plaque for a logged-in user.
 * By default displays a profile image and email address.
 * Can accept a custom set of fields to be displayed from the user profiled
 * as well as a boolean value to not show the avatar image.
 *
 * @param {string} className - optional additional css class
 * @param {object[]} [fields] - field definitions ({ key, label}) to display
 *   default: [{ key: 'email', label: 'Email' }]
 * @param {object} profile - user profile data from Auth0
 * @param {bool} [showAvatar=true] - should the avatar profile pic be shown?
 */
export const UserPlaque = ({ className, fields, profile, showAvatar }) => (
  <div className={classNames("user-plaque", className)}>
    { showAvatar &&
        <img className="avatar icon" src={profile.picture} alt="avatar" />
    }
    {
      fields.map(
        ({ key, label }) => <ValueLabel key={key} label={label} value={profile[key]} />
      )
    }
  </div>
)
UserPlaque.propTypes = {
  className: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
  })),
  profile: PropTypes.shape({
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
  showAvatar: PropTypes.bool,
};

UserPlaque.defaultProps = {
  fields: [
    { key: 'email', label: 'Email' },
  ],
  showAvatar: true,
}

export default UserPlaque;
