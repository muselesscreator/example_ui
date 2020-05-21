/** @module */
import React from 'react';

import { diceTypes } from 'variables/dice';
import { DieControl, RollsList } from './components';

import './DiceRoller.scss';

/**
 * Dice roller view component.
 * Provide a DieControl component for each die type, along with a RollsList
 */
export const DiceRoller = () => 
  <div className="dice-roller-view">
    <div className="dice-container">
      <DieControl type={diceTypes.d4} />
      <DieControl type={diceTypes.d6} />
      <DieControl type={diceTypes.d8} />
      <DieControl type={diceTypes.d10} />
      <br />
      <DieControl type={diceTypes.d12} />
      <DieControl type={diceTypes.d20} />
      <DieControl type={diceTypes.d100} />
    </div>
    <RollsList />
  </div>

DiceRoller.propTypes = {
};

export default DiceRoller;
