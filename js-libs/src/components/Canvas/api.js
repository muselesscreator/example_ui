import * as d3 from 'd3';

/**
 * Canvas component wraps a simple canvas and provides a number of
 * access features to its context, while also attaching a zoom/pan
 * listener.
 * 
 * When attaching a ref to this component, you gain direct access to:
 * * this.canvas - ref to internal canvas
 * * this.d3Canvas - d3 reference to canvas
 * * this.ctx - canvas context
 * * this.fitToScreen() - resize content back to canvas size.
 *
 * @param height {number} - canvas height (pixels)
 * @param width {number} - canvas width (pixels)
 * @param draw {func} - function to be called on re-render (drag/zoom)
 * @param onmousemove {func} - function to be called with the mouse position of
 *                             mousemove events.
 * @param onmouseout {func} - function to be called on mouseout events.
 * @param onzoom {func} - function to be called with new transform on drag/zoom
 */
export class Canvas extends Object {
  constructor(el) {
    super(el.props);
    this.el = el;
    this.gridZoom = null;
    this.initialScale = 3;
    this.scaleExtent = [1/8, 20];
    this.transform = { x: 0, y: 0, k: 1 };
    this.imgProps = [ null, 0, 0, 1, 1 ];
  }

  initialize() {
    this.enableZoom();
    this.draw();
    const d3Canvas = this.d3Canvas();
    d3Canvas.on("mousemove", this.onmousemove);
    d3Canvas.on("mouseout", this.onmouseout);
  }

  /**
   * @return { object } - element props
   */
  props = () => this.el.props;

  /**
   * Calls the element's setState method with the passed args.
   */
  setState = (...args) => this.el.setState(...args);

  /**
   * @return - canvas element
   */
  canvas = () => this.el.refs.canvas;

  /**
   * @return - d3 canvas selection
   */
  d3Canvas = () => d3.select(this.canvas());

  /**
   * @return - canvas context
   */
  ctx = () => this.canvas().getContext('2d');

  /**
   * Callback for onmousemove events.
   *
   * Calls passed onmousemove callback from element with scaled location.
   */
  onmousemove = () => {
    const { offsetX, offsetY } = d3.event;
    const { x, y, k } = this.transform;
    this.props().onmousemove([
      (offsetX - x) / k,
      (offsetY - y) / k,
    ]);
  }

  /**
   * Callback for onmouseout events.
   *
   * Calls passed onmouseout callback from element.
   */
  onmouseout = () => {
    this.props().onmouseout();
  }

  /**
   * Re-draws last image.
   */
  draw = () => {
    if (this.imgProps[0] !== null) {
      this.drawImage(...this.imgProps);
    }
  }

  /**
   * Calls drawImage on the canvas context with the passed args
   * after setting the translation and scal eot match the trasnform.
   */
  drawImage(...props) {
    const ctx = this.ctx();

    this.imgProps = props;

    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.scale(this.transform.k, this.transform.k);
    ctx.drawImage(...this.imgProps);

    ctx.restore();
  }

  /**
   * Resets the canvas by toggling its width.
   */
  clear = () => this.canvas().width = this.props().width;

  /**
   * Apply zoom transform on zoom event.
   */
  zoomed = (transform) => {
    this.props().onZoom(transform);
    this.transform = transform;
    this.clear();
    this.draw();
  }

  /**
   * Register zoom interaction callback.
   */
  enableZoom = () => {
    const zoomed = () => this.zoomed(d3.event.transform);
    const { width, height } = this.props();

    const w = this.initialScale * width;
    const h = this.initialScale * height;

    this.gridZoom = d3.zoom()
      .scaleExtent(this.scaleExtent)
      .translateExtent([[-w, -h], [w, h]])
      .on("zoom", zoomed);
    this.d3Canvas().call(this.gridZoom);
  }

  /**
   * Apply identity transform
   */
  fitToScreen = () => {
    this.zoomed({x: 0, y: 0, k: 1});
  }
}

export default Canvas;
