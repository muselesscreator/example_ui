/** @module */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Component } from 'components';
import { actions, selectors } from 'store';

import {
  diceSides,
  diceURIs,
} from 'variables/dice';

import './DieControl.scss';

/**
 * Simple Dice-roll control component.
 * Provides a button for rolling the die, a visual display of the die type,
 * and a textual display of the most recent roll of this die.
 *
 * @param {string} type - die type ({ diceTypes } from 'variables/dice')
 */
export class DieControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastValue: undefined,
    };
    this.roll = this.roll.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // reset lastValue when rolls are cleared.
    if (this.props.rolls.length === 0 && this.state.lastValue) {
      this.setState({ lastValue: undefined });
    }
  }

  /**
   * Generate a new value based on the die type, update lastValue,
   * and call addRoll prop with roll string.
   */
  roll() {
    const sides = diceSides[this.props.type];
    const value = Math.floor(Math.random() * sides + 1);
    this.setState({ lastValue: value });
    this.props.addRoll(`You rolled a(n) ${value} on a ${this.props.type}`);
  }

  render() {
    const { type } = this.props;
    return (
      <div className="die-control">
        <img
          className="die-img"
          src={diceURIs[type]}
          alt="dice"
        />
        <br />
        <div className="last-value">
          { this.state.lastValue && `Last Value: ${this.state.lastValue}`}
        </div>
        <Button className="roll-btn" onClick={this.roll}>
          Roll 1{type}
        </Button>
      </div>
    );
  }
}

DieControl.propTypes = {
  type: PropTypes.string,
  // redux
  addRoll: PropTypes.func,
  rolls: PropTypes.arrayOf(PropTypes.string),
};

export const mapStateToProps = (state) => ({
  rolls: selectors.simple_store.rolls(state),
});

export const mapDispatchToProps = {
  addRoll: actions.simple_store.addRoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(DieControl);
