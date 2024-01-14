import "./FilesTable.css";
import { useTable, useSortBy } from "react-table";
import { fetchFiles } from "./FileFetcher.ts";
import { NameComponent, LinkComponent } from "./ColumnComponent.tsx";
import React from "react";


function FilesTable() {
  // Sets the path which in turn retrieves the data.
  const [currentPath, setCurrentPath] = React.useState(() => "/src");
  const [data, setData] = React.useState(() => []);
  React.useEffect(() => {
    setData(fetchFiles(currentPath));
  }, [currentPath]);

  const handlePathClick = (clickedPath) => {
    setCurrentPath(clickedPath);
    setData(fetchFiles(clickedPath));
  };

  const columns = React.useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ cell, row }) => (
        <NameComponent cell={cell} row={row} handlePathClick={handlePathClick} currentPath={currentPath} />
      ),
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
      Cell: LinkComponent,
    },
  ], [currentPath]);
  const pathParts = currentPath.split("/").filter(Boolean);

  // Actual Table Gets Populated here.
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      useSortBy,
    });
  return (
    <>
      <div className="container">
        <div>
          <span className="path-link" onClick={() => handlePathClick("/")}>root</span>
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              {" / "}
              <span className="path-link"
                onClick={() =>
                  handlePathClick(`/${pathParts.slice(0, index + 1).join("/")}`)
                }
              >
                {part}
              </span>
            </React.Fragment>
          ))}
        </div>
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
