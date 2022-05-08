import React from "react";

import TableHeader from "./table-header";
import TableBody from "./table-body";

export default function Table({ data, columns, sortColumn, sort }) {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} sort={sort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}
