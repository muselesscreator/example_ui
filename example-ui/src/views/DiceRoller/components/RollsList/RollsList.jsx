/** @module */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions, selectors } from 'store';
import { Button } from 'components';

import './RollsList.scss';

/**
 * Simple display component for the D&D dice rolls list.
 * Provides a formatted list of roll strings, with a button at the bottom
 * allowing the user to clear all registered rolls.
 */
export const RollsList = ({ clearRolls, rolls, maxRoll, numRolls }) =>
  <div className="rolls-list">
    <div className="rolls-container">
      { rolls.map((roll, index) => (
        <div className="roll-entry" key={index}>
          {roll}
        </div>
      )) }
      Number of Rolls: {numRolls}
    </div>
    <div className="action-bar">
      <Button
        className="clear-rolls-btn"
        onClick={clearRolls}
      >
        Clear
      </Button>
    </div>
    
  </div>

RollsList.propTypes = {
  // redux
  rolls: PropTypes.arrayOf(PropTypes.string),
  clearRolls: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  rolls: selectors.simple_store.rolls(state),
  numRolls: selectors.simple_store.numRolls(state),
});

export const mapDispatchToProps = {
  clearRolls: actions.simple_store.clearRolls,
};

export default connect(mapStateToProps, mapDispatchToProps)(RollsList);
