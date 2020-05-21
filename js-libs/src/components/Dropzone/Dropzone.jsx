/** @module */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Segment } from 'semantic-ui-react';

import DropzoneBase from 'react-dropzone';

import { Button } from 'components';
import Component from '../Component';

import './Dropzone.scss';

/**
 * Extension of the react-dropzone component.
 *
 * Accepts a list of accepted filetypes, a label, and an onDrop callback.
 *
 * Provides a Clear Files option when a file has been uploaded.
 */
export class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  /**
   * @method
   * Handle dropped files, by updating current state and calling passed
   * onDrop method.
   * @param {object[]} files - array of files passed by dropzone event.
   */
  onDrop = (files) => {
    this.setState({ files });
    this.props.onDrop(files);
  }

  /**
   * @method
   * Simple string formatter for loaded file objects.
   * @param {object} file - file object data
   * @return {string} - formatted file display string.
   */
  displayFile = (file) => `${file.path} - ${file.size} bytes`;

  /**
   * @method
   * Event handler that clears current loaded files.
   */
  clearFiles = (open) => (e) => {
    e.stopPropagation();
    this.onDrop({ files: [] });
    open();
  };

  formatsString = () => {
    const { acceptedTypes } = this.props;
    const numFormats = acceptedTypes.length;

    if (numFormats === 1) {
      return `Supported format ${acceptedTypes[0]}`
    }
    else if (numFormats === 2) {
      return `Supported formats ${acceptedTypes.join(' or ')}`
    }
    else {
      const commaList = acceptedTypes.slice(0, numFormats).join(', ');
      return `Supported formats ${commaList}, or ${acceptedTypes[numFormats]}`;
    }
  }

  render() {
    const { acceptedTypes, light } = this.props;

    const hasFile = this.state.files.length > 0;

    return (
      <DropzoneBase
        onDrop={this.onDrop}
        accept={acceptedTypes.join(', ')}
        noClick={true}
        noKeyboard={true}
      >
        {({ getRootProps, getInputProps, open }) => (
          <Segment
            inverted
            className={classNames("dropzone-component", { light })}
          >
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              { !hasFile
                ? <>
                    <Icon className="upload" name="cloud upload" />
                    <br />
                    <div className="prompt">
                      Drag and drop file here
                      <br />
                      or
                      <br />
                    </div>
                    <Button className="browse-btn" onClick={open}>Browse</Button>
                    <br />
                    <em>{this.formatsString()}</em>
                  </>
                : <>
                    <div className="file-display">
                      Files: {this.displayFile(this.state.files[0])}
                    </div>
                    <Button
                      className="re-upload"
                      onClick={this.clearFiles(open)}
                      inverted={false}
                    >
                      Upload again
                    </Button>
                  </>
              }

            </div>
          </Segment>
        )}
      </DropzoneBase>
    );
  }
}

Dropzone.propTypes = {
  acceptedTypes: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  onDrop: PropTypes.func,
  light: PropTypes.bool,
};

export default Dropzone;
