import React from "react";

import _ from "lodash";

export default function TableBody({ data, columns }) {
  const key = column => column.path || column.key;

  const renderCell = (item, column) =>
    _.get(item, column.path) || column.content(item);

  return (
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          {columns.map(column => (
            <td key={key(column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
