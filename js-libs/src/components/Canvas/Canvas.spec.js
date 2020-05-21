import React from 'react';

import { mount } from 'enzyme';

import { Canvas } from './Canvas';
import { simpleTest } from 'modules/redux-test/components';

import CanvasAPI from './api';

jest.mock('./api', () => {
  return jest.fn().mockImplementation((args) => ({
    args,
    initialize: jest.fn(),
  }))
});

describe('Canvas component', () => {
  simpleTest('smoke', Canvas, {
    height: 20,
    width: 100,
    className: 'cl_n',
    onZoom: jest.fn(),
    onmousemove: jest.fn(),
    ommouseout: jest.fn(),
  });
  it('includes default functions for event props', () => {
    const el = mount(<Canvas />);
    expect(el.prop('onZoom')()).toEqual({});
    expect(el.prop('onmousemove')()).toEqual({});
    expect(el.prop('onmousemove')()).toEqual({});
  });
  it('initializes a Canvas API module with itself', () => {
    const props = { some: 'props', for_a: 'component test' };
    const el = mount(<Canvas { ...props } />);
    expect(el.state()).toEqual({ transform: { x: 0, y: 0, k: 1 } });
    const instance = el.instance();
    expect(instance.canvas.args).toEqual(instance);
    expect(instance.canvas.initialize).toHaveBeenCalled();
  });
});
