import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";
//The parameters are being destructured from "props" object
const Table = ({ columns, sortColumn, onSort, uniqueKey, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} uniqueKey={uniqueKey} />
      <tfoot>
        <tr key="1">
          <td colSpan="5">
            <span>
              {data.length === 0
                ? "There are no Records in database"
                : `Showing ${data.length} Records from database`}
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
Table.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  uniqueKey: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
export default Table;
