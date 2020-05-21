import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { shouldUpdate } from 'modules/react';
import './SliderToggle.scss';

/**
 * A slider toggle for a given menu-item.
 * 
 * @param onChange { function } - toggle callback
 * @param value { boolean } - current value
 */
export class SliderToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
  }
  shouldComponentUpdate(prevProps) {
    return shouldUpdate(this, prevProps);
  }
  handleClick = (e) => {
    e.stopPropagation();
    this.setState({ value: !this.state.value });
    this.props.onChange(this.state.value);
  }
  render() {
    return (
      <div
        className={classNames("brw-slider-toggle", { right: this.state.value })}
        onClick={this.handleClick}
      >
        <div className="track"/>
        <div className="handle"/>
      </div>
    );
  }
}

SliderToggle.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
};
SliderToggle.defaultProps = {
  onChange: console.log,
}

export default SliderToggle;
