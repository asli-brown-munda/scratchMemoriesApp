import "./FilesTable.css";
import { useTable, useSortBy } from "react-table";
import { fetchFiles } from "./FileFetcher.ts";
import { NameComponent, LinkComponent } from "./ColumnComponent.tsx";
import React from "react";
import MKButton from "components/MKButton/index.js";
import MKBox from "components/MKBox/index.js";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";

function FilesTable() {
  // Sets the path which in turn retrieves the data.
  const [currentPath, setCurrentPath] = React.useState(() => "/");
  const [data, setData] = React.useState(() => []);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  React.useEffect(() => {
    setData(fetchFiles(currentPath));
  }, [currentPath]);

  const handleCheckboxChange = (fileId) => {
    setSelectedFiles((prevSelectedFiles) => {
      const isFileSelected = prevSelectedFiles.includes(fileId);

      if (isFileSelected) {
        return prevSelectedFiles.filter((id) => id !== fileId);
      } else {
        return [...prevSelectedFiles, fileId];
      }
    });
  };
  const handlePathClick = (clickedPath) => {
    setCurrentPath(clickedPath);
    setData(fetchFiles(clickedPath));
    setSelectedFiles([]);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Select",
        accessor: "id",
        Cell: ({ cell, row }) => {
          const isFile = row.original.type !== "folder";

          return isFile ? (
            <Checkbox
              onChange={() => handleCheckboxChange(cell.value)}
              checked={selectedFiles.includes(cell.value)}
            />
          ) : null;
        },
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell, row }) => (
          <NameComponent
            cell={cell}
            row={row}
            handlePathClick={handlePathClick}
            currentPath={currentPath}
          />
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
    ],
    [currentPath, selectedFiles]
  );

  // Actual Table Gets Populated here.
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      useSortBy,
    });
  return (
    <MKBox
      color="black"
      variant="gradient"
      borderRadius="lg"
      shadow="lg"
      opacity={1}
      p={2}
    >
      {CurrentPathElement(currentPath, handlePathClick, data, selectedFiles, setSelectedFiles)}

      <table
        className="table align-middle table-nowrap table-hover mb-0"
        {...getTableProps()}
      >
        <thead className="table-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
    </MKBox>
  );
}

function CurrentPathElement(currentPath, handlePathClick, data, selectedFiles, setSelectedFiles) {
  const pathParts = currentPath.split("/").filter(Boolean);
  const handleDownloadSelected = () => {
    // Implement download logic for selected files
    // Iterate through selectedFiles and initiate download for each file
    selectedFiles.forEach((fileId) => {
      const file = data.find((file) => file.id === fileId);
      if (file && file.link && file.type !== "folder") {
        const downloadLink = document.createElement("a");
        downloadLink.href = file.link;
        downloadLink.download = file.name;
        console.log(downloadLink);
      }
    })
    
    // Clear selected files after download
    setSelectedFiles([]);
  };

  return (
    <>
      <MKBox>
        <Grid container>
          <Grid item md={10} marginLeft={2}>
            Current Path:
            <span className="path-link" onClick={() => handlePathClick("/")}>
              root
            </span>
            {pathParts.map((part, index) => (
              <React.Fragment key={index}>
                {" / "}
                <span
                  className="path-link"
                  onClick={() =>
                    handlePathClick(
                      `/${pathParts.slice(0, index + 1).join("/")}`
                    )
                  }
                >
                  {part}
                </span>
              </React.Fragment>
            ))}
          </Grid>
          <Grid item>
            <MKButton
              variant="gradient"
              color="info"
              onClick={handleDownloadSelected}
              size="small"
            >
              Download Selected
            </MKButton>
          </Grid>
        </Grid>
        <br></br>
      </MKBox>
    </>
  );
}

export default FilesTable;
