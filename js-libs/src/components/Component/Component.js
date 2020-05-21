/** @module */
import { Component as BaseComponent } from 'react';

import { shouldUpdate } from 'modules/react';

/**
 * Base Component class that implements a stricter shouldComponentUpdate
 * than the default react Component class.
 *
 * Should be used for all components that receive object or function params.
 */
export class Component extends BaseComponent {
  shouldComponentUpdate(prevProps, prevState) {
    return shouldUpdate(this, prevProps, prevState);
  }
};

export default Component;
