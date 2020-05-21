import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';

import Component from '../Component';
import SliderToggle from './SliderToggle';

/**
 * A single item within a MenuButton's dropdown.
 *
 * Displays a slide-toggle if a toggleVal is passed.
 *
 * @param icon { string } - string icon designator.
 * @param label { string } - item label
 * @param onClick { function } - click callback
 * @param onToggle { function } - slide-toggle callback (optional)
 * @param toggleVal { boolean } - slide-toggle value (optional)
 */
export class MenuItem extends Component {
  toggle = () => {
    const { toggleVal, onToggle } = this.props;
    if (toggleVal === undefined) {
      return toggleVal;
    }
    return <SliderToggle value={toggleVal} onChange={onToggle} />;
  }
  render() {
    const {
      entryIndex, icon, label, onClick,
    } = this.props;
    return (
      <Dropdown.Item
        key={"entry-"+entryIndex}
        onClick={onClick}
      >
        <div>
          { this.toggle() }
          <Icon name={icon} />
          { label }
        </div>
      </Dropdown.Item>
    );
  }
}

MenuItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onToggle: PropTypes.func,
  toggleVal: PropTypes.bool,
};

export default MenuItem;
