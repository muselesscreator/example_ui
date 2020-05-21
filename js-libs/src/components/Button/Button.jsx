/** @module */
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Component from '../Component';

import './Button.scss';

/**
 * Basic Button implementation.  Adds our styling options to the basic
 * semantic-ui-react Button.
 *
 * Accepts all options for the semantic-ui-button:
 * <https://react.semantic-ui.com/elements/button>
 *
 * @param {string} [className] - additional css class names
 * @param {string} [icon] - icon name
 * @param {boolean} [dark=false] - is the button active? (adds css class)
 * @param {boolean} [active=false] - is the button active? (adds css class)
 * @param {boolean} [danger=false] - is the button active? (adds css class)
 * @param {boolean} [secondary=false] - is the button active? (adds css class)
 */
export class RCButton extends Component {
  render() {
    const {
      className,
      children,
      active,
      danger,
      dark,
      icon,
      secondary,
      ...props
    } = this.props;
    const optClassnames = { active, dark, danger, secondary };
    const btnProps = {
      size: 'mini',
      className: classNames(className, 'brw-btn', optClassnames),
      ...props,
    };
    if (children === undefined) {
      return <Button icon={icon} { ...btnProps } />
    }
    return (
      <Button { ...btnProps } >
        { icon !== undefined && <Icon name={icon} /> }
        { children }
      </Button>
    );
  }
}
RCButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  dark: PropTypes.bool,
  active: PropTypes.bool,
  danger: PropTypes.bool,
  secondary: PropTypes.bool,
}

RCButton.defaultProps = {
  active: false,
  className: '',
  danger: false,
  dark: false,
  secondary: false,
}

export default RCButton;
