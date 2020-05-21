import React, { Component } from 'react';

import HintControl from './HintControl';
import { Button, Checkbox, Input } from 'components';

export class Demo extends Component {
  state = {
    callbackValue: false,
  };
  handleCallback = () => this.setState({ callbackValue: !this.state.callbackValue });

  render() {
    const { callbackValue } = this.state;
    return (
      <div>
        <h3>Same styling options as Button component</h3>
        <HintControl hint="Listen!"><Button>Hey!</Button></HintControl>
        <HintControl hint={callbackValue ? "Yes!" : "That's a no!"}>
          <Checkbox
            checked={callbackValue}
            onChange={this.handleCallback}
            label="Am I Checked?"
          />
        </HintControl>
        <HintControl hint="This input has a very special job"><Input leftLabel="Special Label"/></HintControl>

        <h3>Label Properties</h3>
        Supports all properteis for semantic UI React Label Properties  (https://react.semantic-ui.com/elements/label)
        <br />
        <br />
        <HintControl
          labelProps={{color: 'red'}}
          hint="A Red hint!"
        >
          <Button color="red">This button has a red hint</Button>
        </HintControl>
        <HintControl
          labelProps={{color: 'yellow'}}
          hint="A yellow hint!"
        >
          <Button color="yellow">This button has a yellow hint</Button>
        </HintControl>
      </div>
    );
  }
}

export default Demo;
