import changeHandler from './changeHandler';
import * as common from 'modules/common';

jest.mock('modules/common');

describe('modules form utils - changeHandler', () => {
  const component = {
    state: { a: 1, b: 2, c: 3 },
    setState: jest.fn(),
  };
  const path = 'p.a.t.h';
  const e = 'err';
  const data = { value: 'VALue' };
  const fakeVal = 'FAKE';
  it('takes a component and returns a changeHandler creator function', () => {
    expect(typeof changeHandler(component)(path)).toEqual('function');
  });
  it('sets value based on defaultTo output', () => {
    const expected = {
      ...component.state,
      p: { a: { t: { h: fakeVal } } },
    };
    common.defaultTo = jest.fn(() => fakeVal);
    changeHandler(component)(path)(e, data);
    const args = common.defaultTo.mock.calls[0];
    expect(args[0]).toEqual(data);
    expect(args[1]).toEqual(e);
    expect(args[2]()).toEqual(data.value);
    expect(component.setState).toHaveBeenCalledWith(expected);
  });
});
