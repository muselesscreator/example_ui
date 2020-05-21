import { components } from 'js-libs/build/redux-test';

import * as module from './DiceRoller';

jest.mock('./components', () => ({
  DieControl: 'DieControl',
  RollsList: 'RollsList',
}));

describe('DiceRoller component', () => {
  describe('Component', () => {
    components.simpleTest('smoke test', module.DiceRoller, {});
  });
});

