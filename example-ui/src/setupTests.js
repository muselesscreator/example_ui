import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
HTMLCanvasElement.prototype.getContext = jest.fn();

jest.mock('js-libs/build/components', () => ({
  Button: 'Button',
  Component: jest.requireActual('react').Component,
  Slider: 'Slider',
}));

jest.mock('components', () => ({
  Button: 'Button',
  Cassette: 'Cassette',
  Toggle: 'Toggle',
  Component: jest.requireActual('react').Component,
  Slider: 'Slider',
}));

jest.mock('semantic-ui-react', () => ({
  Icon: 'Icon',
  Modal: 'Modal',
  Popup: 'Popup',
}));
