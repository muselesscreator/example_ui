/** @module */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import classNames from 'classnames';

import Component from '../Component';
import { Button } from 'components';

import './ModalButton.scss';

/**
 * Configuration for a button within the modal window.
 *
 * @typedef {Object} buttonConfig
 * @property {string} color - valid css color
 * @property {string|JSX} content - button content
 * @property {callback} onClick - click event handler
 * @property {boolean} disabled - is the button disabled
 * @property {boolean} [close=true] - does the button close the modal.
 */

/**
 * Generates a modal that is tied to a button component.
 *
 * @param {string|JSX} btnText - contents of button component
 * @param {string|JSX} headerText - modal header text
 * @param {buttonConfig[]} buttons - array of button definitions for action pane.
 * @param {callback} onClick - additional function to call on button click.
 * @param {string} size - modal size (semantic-ui-react/modules/modal)
 * @param {string} size - button size (semantic-ui-react/elements/button)
 * @param {callback} updateState - takes true/false and controls whether the modal is open.
 * @param {JSX} children - modal body content
 */
export class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }
  componentWillUnmount() {
    this.updateState = () => ({});
  }
  updateState = (state) => {
    this.setState({ showModal: state });
    if (this.props.updateState !== undefined) {
      this.props.updateState(state);
    }
  }
  close = () => this.updateState(false)
  open = () => this.updateState(true)
  render() {
    const btnClick = () => {
      this.props.onClick();
      this.open();
    }
    const { btnSize, btnText, btnProps } = this.props;
    return (
      <Modal
        className={classNames('brw-modal-btn', this.props.className)}
        trigger={<Button size={btnSize} onClick={btnClick} {...btnProps}>{btnText}</Button>}
        open={this.state.showModal}
        onClose={() => this.updateState(false)}
        size={this.props.size}
        closeIcon
      >
        <Modal.Header>
          {this.props.headerText}
        </Modal.Header>
        <Modal.Content>
          { this.props.children }
        </Modal.Content>
        <Modal.Actions>
          { this.props.buttons.map(({ color, content, onClick, close=true, disabled=false }, i) =>
            <Button
              key={i}
              color={color}
              inverted={false}
              disabled={disabled}
              onClick={() => {
                if (onClick !== undefined) {
                  //Give buttons the ability to control how/when they close the modal
                  onClick(this.close);
                }
                if (close) {
                  this.close()
                }
              }}
            >
              {content}
            </Button>
          )}
        
        </Modal.Actions>
      </Modal>
    );
  }
}
ModalButton.propTypes = {
  btnText: PropTypes.node.isRequired,
  headerText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  buttons: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  children: PropTypes.node,
  size: PropTypes.string,
  btnSize: PropTypes.string,
  // takes true/false and controls whether the modal is open.
  updateState: PropTypes.func,
};
ModalButton.defaultProps = {
  onClick: () => ({}),
};

export default ModalButton;
