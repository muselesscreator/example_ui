/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Component from '../Component';
import Input from '../Input';

/**
 * ValueLabel component provides readonly input for labeled value readouts.
 *
 * @param {string} label - leftLabel
 * @param {string} units - rightLabel
 * @param {Number|string} value - current value
 * @param {string} [className] - additional css class.
 */
export class ValueLabel extends Component {
  render() {
    const { label, value, units, className } = this.props;
    return (
      <Input
        className={classNames("brw-value-label", className)}
        // Ensure clean style in the absence of a right label (units)
        { ... (units ? { leftLabel: label, rightLabel: units } : { label }) }
        value={value}
        readonly
      />
    );
  }
}

ValueLabel.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  units: PropTypes.string,
  className: PropTypes.string,
};

export default ValueLabel;
