/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Step } from 'semantic-ui-react';

import "./Nav.scss";

/**
 * Redux callback to set the page value for this nav
 * @callback selectCallback
 * @param {string} page - new page value
 */

/**
 * The Nav component is intended to be used in a list, and tied
 * to a redux source of truth for its current value.
 *
 * @param {string} page - route key for the given page
 * @param {selectCallback} select - callback setting the current page
 * @param {string} current- current page's route key
 * @param {Object} routes - object w/ page route keys tied to
 *   `{ name, label, icon }` route definitions.
 */
export const Nav = ({ page, select, current, routes }) => {
  const { name, label, icon } = routes[page];
  const selected = current === page;
  return (
    <Step
      key={page}
      icon={icon}
      title={name}
      description={label}
      onClick={select}
      className={classNames("brw-nav", { selected })}
    />
  );
}

Nav.propTypes = {
  page: PropTypes.string,
  active: PropTypes.bool,
  select: PropTypes.func,
};

export default Nav;
