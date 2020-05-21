/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput } from 'semantic-ui-react';
import classNames from 'classnames';

import Component from '../Component';
import { defaultTo } from 'modules/common';
import InputLabel from './InputLabel';

import './Input.scss';

/**
 * @callback changeCallback
 * @param {string|Number} newVal - new input value
 */

/**
 * Input component wraps semantic-ui-react Input, providing labels,
 * theming, some data validation, and a simplified onChange pipeline.
 *
 * Enforces min/max if provided, as well as enforcing integer values if the
 * integer flag is passed.
 *
 * @param {string} [type="text"] - "number" or "text"
 * @param {boolean} [integer=false] - enforce integer values.
 * @param {string|Number} [value=""] - current input value
 * @param {changeCallback} onChange - called with output value
 * @param {string} [leftLabel] - label to show to left of input
 * @param {string} [rightLabel] - label to show to right of input
 * @param {boolean} [readonly=false] - read-only input
 * @param {boolean} [fluid=false] - passed to semantic ui component
 * @param {boolean} [dark=false] - use dark theme?
 */
export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }
  handleChange = (e, data) => {
    const { integer, min, max, type } = this.props;
    if (type === 'file') {
      return { file: e.target.files[0], filename: data.value.split("fakepath\\")[1] };
    }
    let value = data.value;
    if (integer) {
      if (value === '' || value === '-') {
        return this.setState({ value });
      }
      else {
        value = parseInt(value);
        if (value.toString() === 'NaN') {
          return;
        }
      }
    }
    value = defaultTo(min, value, () => Math.max(min, value));
    value = defaultTo(max, value, () => Math.min(max, value));
    this.setState({ value });
    if (this.props.onChange !== undefined) {
      this.props.onChange(value);
    }
  }
  render() {
    const {
      leftLabel,
      rightLabel,
      readonly,
      fluid,
      onChange,
      className,
      dark,
      integer,
      ...inputProps
    } = this.props;
    const labels = {
      ...(leftLabel !== undefined && { left: leftLabel }),
      ...(rightLabel !== undefined && { right: rightLabel }),
    };
    const numLabels = Object.keys(labels).length;
    let params = {
      ...inputProps,
      className: classNames(
        'brw-input',
        className,
        { dark }),
      placeholder: '---',
      value: this.state.value,
      onChange: this.handleChange.bind(this),
    };
    if (numLabels > 0) {
      params = { ...params, labelPosition: 'right' };
      return (
        <BaseInput { ...params } disabled={readonly} fluid={fluid}>
          <InputLabel label={leftLabel} />
          <input />
          <InputLabel label={rightLabel} />
        </BaseInput>
      );
    }
    return <BaseInput { ...params } disabled={readonly} fluid={fluid}/>;
  }
}
Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'file']),
  integer: PropTypes.bool,

  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,

  leftLabel: PropTypes.node,
  rightLabel: PropTypes.node,

  readonly: PropTypes.bool,
  fluid: PropTypes.bool,
  dark: PropTypes.bool,
}
Input.defaultProps = {
  value: '',
  type: 'text',
  onChange: () => ({}),
};

export default Input;
