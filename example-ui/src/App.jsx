/**
 * Core App container for the UI.
 */
import React from 'react';

import { Component } from 'components';
import { DiceRoller } from 'views';

import "./App.scss";
import "scss/theme.scss";

export class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <div id="header">
          <img
            src="https://i.pinimg.com/originals/48/cb/53/48cb5349f515f6e59edc2a4de294f439.png"
            className="logo-img"
            alt="dnd logo"
          />
          <div className="title">Simple D&D Dice Roller</div>
        </div>
        <DiceRoller />
        <div id="footer" />
      </div>
    );
  }
}
App.propTypes = {
}

export default App;
