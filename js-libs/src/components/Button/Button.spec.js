import React from 'react';
import { render, simpleTest } from 'modules/redux-test/components';

import { RCButton as Button } from './Button';

jest.mock('semantic-ui-react');

describe('Button component', () => {
  let el;
  const props = { some: 'component', props: 'for testing' };
  const className = 'cl_n';
  const icon = 'Icon';
  const children = <div>Some Stuff</div>

  simpleTest('basic', Button, { className, icon, ...props })
  simpleTest('with_children', Button, { className, icon, children, ...props })

  describe('className', () => {
    it('uses passed className alongside brw-btn className', () => {
      el = render(Button, { className });
      expect(el.hasClass('brw-btn')).toEqual(true);
      expect(el.hasClass(className)).toEqual(true);
    });
    const testClassName = (testClass) => {
      it(`includes ${testClass} className iff that prop is included`, () => {
        el = render(Button, { className });
        expect(el.hasClass(testClass)).toEqual(false);
        el = render(Button, { className, [testClass]: true });
        expect(el.hasClass(testClass)).toEqual(true);
      });
    }
    testClassName('active');
    testClassName('danger');
    testClassName('dark');
    testClassName('secondary');
  });

  describe('icon and children', () => {
    it('passes icon as a prop if no children are passed', () => {
      el = render(Button, { className, icon });
      expect(el.prop('icon')).toEqual(icon);
      expect(el.children().exists()).toEqual(false)
    });
    it('passes icon as a child if other children are passed', () => {
      el = render(Button, { className, icon, children });
      expect(el.prop('icon')).toEqual(undefined);
      expect(el.children().contains(children));
      const iconEl = el.children().find('Icon');
      expect(iconEl.exists()).toEqual(true);
      expect(iconEl.prop('name')).toEqual(icon);
    });
  });
});
