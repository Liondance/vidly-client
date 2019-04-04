import React from "react";

export default function TableHeader({ columns, sortColumn, sort }) {
  function raiseSort(path) {
    if (path === undefined) {
      // ignore non-sortable columns
      return;
    }
    let sortCol = { ...sortColumn };
    if (path === sortCol.path) {
      // toggle sorting order
      sortCol.order = sortCol.order === "asc" ? "desc" : "asc";
    } else {
      // set new sort column
      sortCol = { path, order: "asc" };
    }
    // raise sort operation
    sort(sortCol);
  }

  function renderSortIcon(column) {
    if (column.path !== sortColumn.path) return null;
    return (
      <i
        className={
          "fa fa-sort-" + (sortColumn.order === "asc" ? "asc" : "desc")
        }
      />
    );
  }

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
