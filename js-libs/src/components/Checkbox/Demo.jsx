import React from 'react';

import Component from '../Component';
import Checkbox from './Checkbox';

export class Demo extends Component {
  state = {
    val_1: false,
    val_2: false,
  }
  handleToggle = (key) => () => this.setState({ [key]: !this.state[key] });
  render() {
    return (
      <div className="gallery">
        <Checkbox
          label="I'm a Checkbox"
          onChange={this.handleToggle('val_1')}
          checked={this.state.val_1}
        />
        <br />
        <Checkbox
          label="I'm a Vertical Checkbox"
          vertical
          onChange={this.handleToggle('val_2')}
          checked={this.state.val_2}
        />
        <br />
        <Checkbox
          label="I'm a Slider"
          slider
          onChange={this.handleToggle('val_1')}
          checked={this.state.val_1}
        />
        <Checkbox
          label="I'm a Toggle "
          toggle
          onChange={this.handleToggle('val_2')}
          checked={this.state.val_2}
        />
      </div>
    );
  }
}

export default Demo;
