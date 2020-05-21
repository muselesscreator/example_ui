/** @module */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Component from '../Component';
import { shouldUpdate } from 'modules/react';
import CanvasAPI from './api';

import './Canvas.scss';

/**
 * @callback mouseEventCallback
 * @param {Number[]} coordinates - event coordinates.
 */

/**
 * @callback zoomCallback
 * @param {Object} transform - new transform
 */

/**
 * Canvas component wraps a simple canvas and provides a number of
 * access features to its context, while also attaching a zoom/pan
 * listener.
 * 
 * When attaching a ref to this component, you gain direct access to:
 * - this.canvas - ref to internal canvas
 * - this.d3Canvas - d3 reference to canvas
 * - this.ctx - canvas context
 * - this.fitToScreen() - resize content back to canvas size.
 *
 * @param {Number} height - canvas height (pixels)
 * @param {Number} width - canvas width (pixels)
 * @param {mouseEventCallback} onmousemove - function to be called with
 *   the mouse position of mousemove events.
 * @param {mouseEventCallback} onmouseout - function to be called on mouseout events.
 * @param {zoomCallback} onzoom - function to be called with new transform on drag/zoom
 */
export class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transform: { x: 0, y: 0, k: 1 },
    }
    this.canvas = new CanvasAPI(this);
  }
  shouldComponentUpdate(prevProps, prevState) {
    return shouldUpdate(this, prevProps, prevState);
  }
  componentDidMount() {
    this.canvas.initialize();
  }
  render() {
    const { className, height, width } = this.props;
    return (
      <div
        className={classNames('brw-canvas', className)}
        style={{width: `${width}px`, height: `${height}px`}}
      >
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}

Canvas.propTypes = {
  height: PropTypes.number,
  onmousemove: PropTypes.func,
  onmouseout: PropTypes.func,
  onZoom: PropTypes.func,
  width: PropTypes.number,
};
Canvas.defaultProps = {
  onZoom: () => ({}),
  onmousemove: () => ({}),
  onmouseout: () => ({}),
}

export default Canvas;
