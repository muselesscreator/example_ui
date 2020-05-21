import _ from 'lodash';

import { render, simpleTest } from 'modules/redux-test/components';
import { Accordion } from './Accordion';

describe('Accordion component', () => {
  const props = { some: 'props', forThe: 'tests' };
  const className = 'cln';
  simpleTest(
    'basic',
    Accordion,
    {
      className,
      onSelect: jest.fn(),
      ...props,
    }
  );
  describe('prop tests', () => {
    let el, subElement, elementProps, onSelect;

    beforeEach(() => {
      onSelect = jest.fn();
      el = render(Accordion, {
        className,
        onSelect,
        ...props,
      });
      subElement = el.find('Accordion');
      elementProps = subElement.props();
    });

    it('forwards props', () => {
      expect(elementProps.className.split(' ')).toContain(className);
      _.mapValues(props, (val) => expect(elementProps[val]).toEqual(props[val]));
    });

    it('calls onSelect on title click (index if inactive, -1 if active)', () => {
      const index = 2;
      elementProps.onTitleClick('err', { index, active: true });
      expect(onSelect).toHaveBeenCalledWith(-1);
      elementProps.onTitleClick('err', { index, active: false });
      expect(onSelect).toHaveBeenCalledWith(index);
    });
  });

});
