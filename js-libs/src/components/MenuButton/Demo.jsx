import React, { Component } from 'react';
import { ButtonGroup } from 'semantic-ui-react';

import { Button } from 'components';
import MenuButton from './MenuButton';

export class Demo extends Component {
  state = {
    val1: false,
    val2: true,
  }
  onToggle = (key) => () => this.setState({ [key]: !this.state[key] });
  log = string => () => console.log(string);
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button>NormalButtons</Button>
          <MenuButton
            icon="meh outline"
            label="Meme MenuButton"
            contents={[
              [
                {
                  icon: 'birthday cake',
                  label: 'Lies',
                  onClick: this.log("the cake is a lie!")
                },
              ],
              [
                {
                  icon: 'long arrow alternate down',
                  label: 'Enemy Gate',
                  onClick: this.log("The enemy's gate is down"),
                },
              ],
              [
                {
                  icon: 'bullhorn',
                  label: 'Hey!',
                  onClick: this.log("LISTEN!!!"),
                },
                {
                  icon: 'gavel',
                  label: "Its dangerous outside!",
                  onClick: this.log("Take this!: (+1 Bug-smashing hammer)"),
                },
              ],
              [
                {
                  label: `Is this True? ${this.state.val1 ? "Yes" : "No"}`,
                  toggleVal: this.state.val1,
                  onToggle: this.onToggle('val1'),
                }
              ]
            ]}
          />
          <Button>NormalButtons</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Demo;
