import React from 'react';
import { ButtonGroup } from 'semantic-ui-react';

import Component from '../Component';

import Button from './Button';

export class Demo extends Component {
  state = {
    toggleVal: false,
  }
  toggleVal = () => this.setState({ toggleVal: !this.state.toggleVal });
  render() {
    return (
      <div>
        <h4>Styling</h4>
        <Button>Simple Dummy Button</Button>
        <Button color="blue">Colored Button</Button>
        <Button color="blue" inverted={false}>Bold button</Button>
        <Button icon="cogs">Icon Button</Button>
        <Button icon="expand" />
        <Button active>Active button</Button>
        <h4>Button Group</h4>
        <ButtonGroup>
          <Button icon="expand" />
          <Button icon="map">Icon Button</Button>
          <Button color="green">Colored Button</Button>
        </ButtonGroup>
        <h4>Connected: Toggle value = {this.state.toggleVal ? 'True' : 'False'}</h4>
        <Button onClick={this.toggleVal}>Toggle Value</Button>
      </div>
    );
  }
}

export default Demo;
