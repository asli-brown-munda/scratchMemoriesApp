import "./FilesTable.css";
import { useTable, useSortBy } from "react-table";
import { fetchFiles } from "./FileFetcher.ts";
import { NameComponent, LinkComponent } from "./ColumnComponent.tsx";
import React from "react";


export const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    Cell: NameComponent,
  },
  {
    Header: "Date Modified",
    accessor: "updated_at",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Download",
    accessor: "link",
    Cell: LinkComponent
  },
];

function FilesTable() {
  const [currentPath, setCurrentPath] = React.useState(() => "/");
  const [data, setData] = React.useState(() => {
    return fetchFiles(currentPath);
  });
  const columns = React.useMemo(() => COLUMNS, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      useSortBy,
    });

  return (
    <>
      <div className="container">
        <table
          className="table align-middle table-nowrap table-hover mb-0"
          {...getTableProps()}
        >
          <thead className="table-light">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}




export default FilesTable;
