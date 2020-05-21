/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Divider, Dropdown } from 'semantic-ui-react';

import Component from '../Component';
import MenuItem from './MenuItem';

import './MenuButton.scss';

/**
 * @typedef {Object} menuItemOpts
 * @property {string} icon - icon to display on the menu item
 * @property {string} label - label to display on the menu item
 * @property {callback} onClick - click event for the menu item
 * @property {boolean} [toggleVal] - adds toggle w/ this val to menu item
 * @property {callback} [onToggle] - handle toggle on this item
 */

/**
 * MenuButton provides a dropdown in the guise of a button, with menu themed
 * configuration options.
 *
 * A menu item can either have an onClick behavior or an onToggle behavior.
 * To give the item an onToggle behavior, simply assign it a toggleVal.
 *
 * @param {string} [icon] - icon to display in button
 * @param {string} label - text to display on button
 * @param {string} [className] - additional css class
 * @param {menuItemOpts} contents - configuration for menu options.
 */
export class MenuButton extends Component {
  render() {
    const { className, icon, label, contents } = this.props;
    return (
      <Dropdown
        className={classNames(className, "icon", "brw-menu-btn")}
        text={label}
        icon={icon}
        floating
        labeled
        button
        basic
        pointing='top left'
      >
        <Dropdown.Menu>
          { contents.map((group, groupIndex) =>
            <div key={"group-"+groupIndex}>
              { group.map(({ icon, label, onClick, onToggle, toggleVal }, entryIndex) =>
                  <MenuItem
                    entryIndex={entryIndex} 
                    key={entryIndex}
                    {...{ icon, label, onClick, onToggle, toggleVal }}
                  />
              )}
              { groupIndex !== contents.length - 1  && <Divider /> }
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}


MenuButton.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  contents: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
        onToggle: PropTypes.func,
        toggleVal: PropTypes.bool,
      }),
    )
  ),
};

export default MenuButton;
