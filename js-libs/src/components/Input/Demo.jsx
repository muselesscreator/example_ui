import React from 'react';

import Component from '../Component';
import Input from './Input';

export class Demo extends Component {
  state = {
    value: '',
    number: 5,
    integer: 5,
  };
  input = ({ ...props }) => (
    <Input
      value={this.state.value}
      onChange={value => this.setState({ value })}
      {...props}
    />
  );
  number = ({ ...props }) => (
    <Input
      type="number"
      value={this.state.number}
      onChange={number => this.setState({ number })}
      {...props}
    />
  );
  render() {
    const { value, number, integer } = this.state;
    return (
      <div>
        <h3> Labels </h3>
        { this.input({leftLabel: 'Left Label'}) } <br />
        { this.input({rightLabel: 'Right Label'}) } <br />
        { this.input({leftLabel: 'Both', rightLabel: 'Labels!'}) } <br />
        <h3>Numbers</h3>
        <Input
          type="number"
          value={this.state.number}
          leftLabel="min: 1"
          rightLabel="max: 10"
          min={1}
          max={10}
          onChange={number => this.setState({ number })}
        />
        <br />
        <Input
          type="number"
          value={this.state.number}
          leftLabel="Integer"
          min={-100}
          max={100}
          integer
          onChange={integer => this.setState({ integer })}
        />
        <h3>Readonly</h3>
        <Input
          readonly
          value={`"${value}", "${number}", "${integer}"`}
          leftLabel="Value, Number, Integer Val"
        />
      </div>
    );
  }
}

export default Demo;
