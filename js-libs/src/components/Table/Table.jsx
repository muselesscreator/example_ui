/** @module */
import _ from 'lodash';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Component from '../Component';
import { Table as BaseTable } from 'semantic-ui-react';

import './Table.scss';

/**
 * Table component wraps semantic ui table, and simplifies the definition process.
 *
 * @param {JSX[]} headers - list of headers
 * @param {JSX[]} data - list of lists.  each row is included as a list of elements
 * @param {boolean} [sortable=false] - are the rows sortable by column?
 * @param {Number[]} [widths] - optional list of column widths
 */
export class Table extends Component {
  state = {
    column: null,
    direction: null,
  };
  sortedData = () => {
    const { column, direction } = this.state;
    const { data } = this.props;
    const byColumn = _.sortBy(data, column);
    return direction === 'ascending' ? byColumn : byColumn.reverse();
  }
  handleSort = clicked => () => {
    const { column, direction } = this.state;
    if (column !== clicked) {
      this.setState({
        column: clicked,
        direction: 'ascending',
      });
      return;
    }
    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }
  headerCell = (header, index) => {
    const { widths, sortable } = this.props;
    const params = {
      key: index
    };
    if (widths !== undefined) {
      params.width = widths[index];
    }
    if (sortable) {
      const { column, direction } = this.state;
      params.sorted = column === index ? direction : null;
      params.onClick = this.handleSort(index);
    }
    return (
      <BaseTable.HeaderCell {...params}>
        {header}
      </BaseTable.HeaderCell>
    );
  };
  render() {
    const {
      className,
      headers,
      sortable,
      widths,
      ...tableProps
    } = this.props;
    const data = sortable ? this.sortedData() : this.props.data;

    return (
      <BaseTable
        className={classNames("brw-table", className)}
        sortable={sortable}
        {...tableProps}
      >
        <BaseTable.Header>
          <BaseTable.Row>
            { headers.map(this.headerCell) }
          </BaseTable.Row>
        </BaseTable.Header>
        <BaseTable.Body>
          { data.map((row, rowN) =>
            <BaseTable.Row key={rowN}>
              { row.map((item, itemN) =>
                <BaseTable.Cell verticalAlign="middle" key={itemN}>{item}</BaseTable.Cell>
              ) }
            </BaseTable.Row>
          ) }
        </BaseTable.Body>
      </BaseTable>
    );
  }
}
Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  widths: PropTypes.arrayOf(PropTypes.number),
  sortable: PropTypes.bool,
};

Table.defaultProps = {
  headers: [],
  data: [],
};

export default Table;
