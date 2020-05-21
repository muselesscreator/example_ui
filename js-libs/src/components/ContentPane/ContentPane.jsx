/** @module */
import React from 'react';
import PropTypes from 'prop-types';

import Component from '../Component';
import './ContentPane.scss';

/**
 * The purpose of the ContentPane component is to provide a template for a main-panel
 * content widget.
 * 
 * Takes an `id` (for css), a `sidebar` component and wraps its main-value content.
 * i.e.:
 * ```
 * <ContentPane id="test-pane" sidebar={<Sidebar />}>
 *   <ContentComponent />
 * </ContentPane>
 * ```
 *
 * @param {string=} id - html ID for the element
 * @param {JSX} sidebarControls - JSX element
 */
export class ContentPane extends Component {
  render() {
    return (
      <div id={this.props.id} className='brw-content-pane'>
        <div className='brw-content-sidebar'>
          { this.props.sidebarControls }
        </div>
        <div className='brw-contents-wrapper'>
          <div className='brw-content-contents'>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

ContentPane.propTypes = {
  sidebarControls: PropTypes.node,
  children: PropTypes.node,
  id: PropTypes.string,
};

export default ContentPane;
