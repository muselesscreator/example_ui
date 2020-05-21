import * as d3 from 'd3';

import Canvas from './api';

jest.mock('d3');

describe('Canvas component API', () => {
  let el, canvas, ctx, props, mockCanvas;
  beforeEach(() => {
    ctx = {
      drawImage: jest.fn(),
      restore: jest.fn(),
      save: jest.fn(),
      scale: jest.fn(),
      translate: jest.fn(),
    }
    mockCanvas = {
      getContext: jest.fn(() => ctx),
    };
    props = {
      height: 1,
      width: 2,
      draw: jest.fn(),
      onmousemove: jest.fn(),
      onmouseout: jest.fn(),
      onZoom: jest.fn(),
    };
    el = {
      props,
      refs: { canvas: mockCanvas },
      setState: jest.fn(),
      canvas: jest.fn(() => mockCanvas),
      ctx: jest.fn(() => ctx),
    };
    d3.zoom = jest.fn(() => d3);
    d3.scaleExtent = jest.fn(() => d3);
    d3.translateExtent = jest.fn(() => d3);
    d3.on = jest.fn(() => d3);
    d3.event = { transform: { x: 2, y: 12, k: 120 } };
    canvas = new Canvas(el);
  });
  describe('constructor', () => {
    it('takes an element as constructor arg, and sets default values', () => {
      expect(canvas.el).toEqual(el);
      expect(canvas.gridZoom).toEqual(null);
      expect(canvas.initialScale).toEqual(3);
      expect(canvas.scaleExtent).toEqual([1/8, 20]);
      expect(canvas.transform).toEqual({ x: 0, y: 0, k: 1 });
      expect(canvas.imgProps).toEqual([null, 0, 0, 1, 1]);
    });
  });
  describe('constructed methods', () => {
    describe('initialize', () => {
      const on = jest.fn();
      beforeEach(() => {
        canvas.enableZoom = jest.fn();
        canvas.draw = jest.fn();
        canvas.d3Canvas = jest.fn(() => ({ on }));
        canvas.onmousemove = jest.fn(() => "On Mouse Move");
        canvas.onmouseout = jest.fn(() => "On Mouse Out");
        canvas.initialize();
      });
      it('enables zoom and calls initial draw', () => {
        expect(canvas.enableZoom).toHaveBeenCalled();
        expect(canvas.draw).toHaveBeenCalled();
      });
      it('connects mouse events', () => {
        expect(on.mock.calls[0][0]).toEqual('mousemove');
        expect(on.mock.calls[0][1]()).toEqual(canvas.onmousemove());
        expect(on.mock.calls[1][0]).toEqual('mouseout');
        expect(on.mock.calls[1][1]()).toEqual(canvas.onmouseout());
      });
    });
    describe('element accessors', () => {
      it('provides a gettter for the current element props', () => {
        expect(canvas.props()).toEqual(el.props);
      });
      it('provides a shortcut for element setState', () => {
        const args = { some: 'args' };
        canvas.setState(args);
        expect(el.setState).toHaveBeenCalledWith(args);
      });
    });
    describe('onmousemove', () => {
      it('calls onmousemove element prop with mouse offset, scaled by transform', () => {
        canvas.transform = { x: 20, y: 30, k: 10 };
        d3.event = { offsetX: 100, offsetY: 200 };
        const onmousemove = jest.fn();
        canvas.props = jest.fn(() => ({ onmousemove }));
        canvas.onmousemove();
        expect(onmousemove).toHaveBeenCalledWith([8, 17]); // offset - dim / scale
      });
    });
    describe('onmouseout', () => {
      it('calls onmouseout element prop', () => {
        const onmouseout = jest.fn();
        canvas.props = jest.fn(() => ({ onmouseout }));
        canvas.onmouseout();
        expect(onmouseout).toHaveBeenCalled();
      });
    });
    describe('draw', () => {
      it('calls drawImage with imgProps if image has loaded', () => {
        canvas.drawImage = jest.fn();
        canvas.draw();
        expect(canvas.drawImage).not.toHaveBeenCalled();
        const props = ['img', 1, 2, 3 ,4 ];
        canvas.imgProps = props;
        canvas.draw();
        expect(canvas.drawImage).toHaveBeenCalledWith(...props);
      });
    });
    describe('drawImage', () => {
      it('saves image props, then applies transform, and draws the image', () => {
        const props = ['img', 1, 2, 3 ,4 ];
        const transform = { x: 1, y: 2, k: 3 };
        canvas.transform = transform;
        canvas.drawImage(...props);
        expect(canvas.imgProps).toEqual(props);
        expect(ctx.save).toHaveBeenCalled();
        expect(ctx.translate).toHaveBeenCalledWith(transform.x, transform.y);
        expect(ctx.scale).toHaveBeenCalledWith(transform.k, transform.k);
        expect(ctx.drawImage).toHaveBeenCalledWith(...props);
        expect(ctx.restore).toHaveBeenCalled();
      });
    });
    describe('clear', () => {
      it('resets the canvas by reseting its width', () => {
        mockCanvas.width = 23;
        canvas.clear();
        expect(mockCanvas.width).toEqual(props.width);
      });
    });
    describe('zoomed', () => {
      it('calls onZoom, sets the transform, then clears ctx and calls draw', () => {
        const transform = { x: 1, y: 2, k: 3 };
        canvas.clear = jest.fn();
        canvas.draw = jest.fn();
        canvas.zoomed(transform);
        expect(props.onZoom).toHaveBeenCalledWith(transform);
        expect(canvas.transform).toEqual(transform);
        expect(canvas.clear).toHaveBeenCalled();
        expect(canvas.draw).toHaveBeenCalled();
      });
    });
    describe('enableZoom', () => {
      it('sets gridZoom callback', () => {
        const call = jest.fn();
        canvas.d3Canvas = jest.fn(() => ({ call }));
        canvas.zoomed = jest.fn(() => 'zoomed');
        canvas.enableZoom();
        expect(canvas.gridZoom).toEqual(d3);
        expect(call).toHaveBeenCalledWith(d3);
        expect(d3.zoom).toHaveBeenCalled();
        const w = canvas.initialScale * props.width;
        const h = canvas.initialScale * props.height;
        expect(d3.scaleExtent).toHaveBeenCalledWith(canvas.scaleExtent);
        expect(d3.translateExtent).toHaveBeenCalledWith([[-w, -h], [w, h]]);
        const zoomed = d3.on.mock.calls[0][1];
        expect(canvas.zoomed).not.toHaveBeenCalled();
        expect(zoomed()).toEqual('zoomed');
        expect(canvas.zoomed).toHaveBeenCalledWith(d3.event.transform);
      });
    });
    describe('fitToScreen', () => {
      it('calls zoomed with identity transform', () => {
        canvas.zoomed = jest.fn();
        canvas.fitToScreen();
        expect(canvas.zoomed).toHaveBeenCalledWith({ x: 0, y: 0, k: 1 });
      });
    });
  });
});
