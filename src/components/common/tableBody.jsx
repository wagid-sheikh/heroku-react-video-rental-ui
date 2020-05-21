import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    } else {
      return _.get(item, column.column);
    }
  };
  render() {
    const { data, columns, uniqueKey } = this.props;
    return (
      <tbody>
        {data.map((row) => (
          <tr key={row[uniqueKey]}>
            {columns.map((column) => (
              <td key={row[uniqueKey] + (column.column || column.key)}>
                {this.renderCell(row, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  uniqueKey: PropTypes.string.isRequired,
};
export default TableBody;
