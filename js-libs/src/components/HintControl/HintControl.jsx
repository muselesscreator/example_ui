/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import Component from '../Component';
import './HintControl.scss';

/**
 * Wraps any control, to make it display a hint when hovered over.
 *
 * labelProps takes all options accepted by semantic-ui-react label.
 * <https://react.semantic-ui.com/elements/label>
 *
 * @param {string} hint - hint to display
 * @param {Object} labelProps - additional label options.
 */
export class HintControl extends Component {
  render() {
    const { children, hint } = this.props;
    return (
      <Popup
        className='brw-hint'
        trigger={children}
      >
        { hint }
      </Popup>
    );
  };
}

HintControl.propTypes = {
  hint: PropTypes.node,
  labelProps: PropTypes.object,
};

HintControl.defaultProps = {
  labelProps: {},
}

export default HintControl;
