import * as module from './connectedSelectors';

describe('connectedSelectors util', () => {
  const entries = { entry1: '1', entry2: '2' };
  const path = 'test[1]';
  const state = { test: [ 'other', entries ] };
  const selector = jest.fn((entries, index) => ({ entries, index }));
  const index = 'entry2';

  describe('connectOrderSelectors', () => {
    const reduxSelector = module.connectSelector(path)(selector);
    expect(reduxSelector(state, index)).toEqual({ entries, index });
  });

  describe('connectedOrderSelectors', () => {
    let connectSelector;
    beforeEach(() => {
      connectSelector = jest.spyOn(module, 'connectSelector').mockImplementation(
        (path) => (selector) => ({ path, selector })
      );
    });
    afterEach(() => {
      connectSelector.mockRestore();
    });
    it('maps comms selectors to connectSelector function with passed path', () => {
      const commsSelectors = {
        sel1: 'SelEctor 1',
        sel2: 'SeleCTor 2',
      };
      expect(module.connectedSelectors(commsSelectors, path)).toEqual({
        sel1: { selector: commsSelectors.sel1, path },
        sel2: { selector: commsSelectors.sel2, path },
      });
    });
  });
});
