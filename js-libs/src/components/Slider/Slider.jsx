/** @module */

import React from 'react';
import PropTypes from 'prop-types';

import BootstrapSlider from 'react-bootstrap-slider';

import './Slider.scss';

/**
 * @callback sliderCallback
 * @param {Number} - new value
 */

/**
 * Slider component adds some styling to BootstrapSlider.
 *
 * @param {sliderCallback} change - function called on change w/ new value
 * @param {sliderCallback} slideStop - function caleld on slideStop w/ new value
 * @param {string} className - optional additional css class
 */
export const Slider = ({
  change,
  slideStop,
  ...props
}) =>
  <BootstrapSlider
    handle="square"
    change={e => change(e.target.value)}
    slideStop={e => slideStop(e.target.value)}
    { ...props }
  />

Slider.propTypes = {
  change: PropTypes.func,
  slideStop: PropTypes.func,
};
Slider.defaultProps = {
  change: (val) => ({}),
  slideStop: (val) => ({}),
};

export default Slider;
