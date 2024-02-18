import "./FilesTable.css";
import { useTable, useSortBy } from "react-table";

import { NameComponent, LinkComponent } from "./ColumnComponent.tsx";
import React from "react";
import MKButton from "components/MKButton/index.js";
import MKBox from "components/MKBox/index.js";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from 'primereact/progressbar';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useRef } from "react";
import { preProcessTableData } from "./FilesTableUtil.ts";
import { BACKEND_URL } from "config/app_config";
import axios from "axios";

function FilesTable() {

  // Sets the path which in turn retrieves the data.
  const [currentPath, setCurrentPath] = React.useState(() => "/");
  const [data, setData] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectAllChecked, setSelectAllChecked] = React.useState(false);
  const [folderMap, setFolderMap] = React.useState({"/": "root"});

  const [filesUploaded, setFilesUploaded] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    const folderId = folderMap[currentPath];
    fetchFileList(folderId)
      .then(response => setData(response))
      .catch(error => console.error('Error fetching file list:', error));
  }, [currentPath, folderMap, filesUploaded]);

  const fetchFileList = async (folderId) => {
    try {
      const response = await axios.get(BACKEND_URL + '/list/' + folderId)
                        .then(response => preProcessTableData(response.data))
      return await response
    } catch (error) {
      throw new Error(error.message);
    }
  };

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

  const handlePathClick = (clickedPath, folderId) => {
    setCurrentPath(clickedPath);
    setSelectedFiles([]);
    if (folderId !== undefined) {
        setFolderMap(prevPathInfo => ({...prevPathInfo, [clickedPath]: folderId}));
    }
    setSelectAllChecked(false);
  };

  const handleSelectAllChange = () => {
    setSelectAllChecked((prevSelectAllChecked) => !prevSelectAllChecked);
    setSelectedFiles((prevSelectedFiles) => {
      if (!selectAllChecked) {
        return data.map((file) => file.id);
      } else {
        return [];
      }
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <Checkbox
            onChange={handleSelectAllChange}
            checked={selectAllChecked}
          />
        ),
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
      {CurrentPathElement(
        currentPath,
        handlePathClick,
        data,
        selectedFiles,
        setSelectedFiles
      )}

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


  function CurrentPathElement(currentPath, handlePathClick, data, selectedFiles) {
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
      });
    };

    const handleDeleteSelected = () => {
      // Implement download logic for selected files
      // Iterate through selectedFiles and initiate download for each file
      selectedFiles.forEach((fileId) => {
        const file = data.find((file) => file.id === fileId);
        if (file && file.link && file.type !== "folder") {
          console.log(file);
        }
      });
    };
    const fileUploadRef = useRef(null);

    const generateSignedUrl = async (name, folderId) => {
      try {
        const response = await axios.post(BACKEND_URL + "/initiate_upload", {
          'parent_node_id': folderId,
          'node_name': name,
        });
        console.log(response)
        return await response.data;
      } catch (error) {
        console.error('Error generating signed URL:', error);
        return null;
      }
    };

    const confirmFileUpload = async (id) => {
      try {
        const response = await axios.post(BACKEND_URL + "/confirm_upload_status", {
          'id': id,
        });
        console.log(response)
        return await response.data;
      } catch (error) {
        console.error('Error confirming file status:', error);
        return null;
      }
    };

    const customBase64Uploader = async (event) => {
      setUploading(true);
      setProgress(0);
      const folderId = folderMap[currentPath];
      console.log(event);
      console.log(folderId);
      // convert file to base64 encoded
      for (let i = 0; i < event.files.length; ++i) {
        const file = event.files[i]; // Use 'i' to iterate through all files

        // generate signed url
        const uploadData = await generateSignedUrl(file.name, folderId);
        console.log(uploadData)
        const uploadResponse = await axios.put(uploadData.upload_url, file, {
          });
        const fileStatus = await confirmFileUpload(uploadData.id);
        setProgress(((i*100)/event.files.length));
      }

      setUploading(false);
      setFilesUploaded(event.files.length);
      setProgress(0);
      if (fileUploadRef.current) {
        fileUploadRef.current.clear();
      }
    };

    return (
      <>
        <MKBox>
          <Grid container>
            <Grid item md={10} marginLeft={2}>
              Current Path:
              <span className="path-link" onClick={() => handlePathClick("/")}>
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
            <Grid item mr={2}>
              <MKButton
                variant="gradient"
                color="info"
                onClick={handleDeleteSelected}
                size="small"
              >
                Delete Selected
              </MKButton>
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
        <MKBox>
          <FileUpload
            ref={fileUploadRef}
            name="Uploader"
            accept="*"
            maxFileSize={1000000}
            customUpload
            uploadHandler={customBase64Uploader}
            multiple
          />
          {uploading && <ProgressBar mode="determinate" value={progress} />}
        </MKBox>
      </>
    );
  }
}

export default FilesTable;
