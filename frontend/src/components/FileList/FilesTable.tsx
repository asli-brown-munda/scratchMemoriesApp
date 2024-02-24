import "./FilesTable.css";
import { useTable, useSortBy } from "react-table";

import { NameComponent, LinkComponent } from "./ColumnComponent.tsx";
import React from "react";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton/index.js";
import MKBox from "components/MKBox/index.js";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { useRef } from "react";
import { preProcessTableData } from "./FilesTableUtil.ts";
import { BACKEND_URL } from "config/app_config";
import axios from "axios";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DownloadIcon from "@mui/icons-material/Download";

function FilesTable() {
  // Sets the path which in turn retrieves the data.
  const [currentPath, setCurrentPath] = React.useState(() => "/");
  const [data, setData] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectAllChecked, setSelectAllChecked] = React.useState(false);
  const [folderMap, setFolderMap] = React.useState({ "/": "root" });

  const [filesUploaded, setFilesUploaded] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);

  const [fileIds, setFileIds] = React.useState([]);
  const [currentFileIndex, setCurrentFileIndex] = React.useState(0);
  const [signedUrl, setSignedUrl] = React.useState(null);


  React.useEffect(() => {
    const folderId = folderMap[currentPath];
    fetchFileList(folderId)
      .then((response) => setData(response))
      .catch((error) => console.error("Error fetching file list:", error));
  }, [currentPath, folderMap, filesUploaded]);

  const fetchFileList = async (folderId) => {
    try {
      const response = await axios
        .get(BACKEND_URL + "/list/" + folderId)
        .then((response) => preProcessTableData(response.data));
      return await response;
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
      setFolderMap((prevPathInfo) => ({
        ...prevPathInfo,
        [clickedPath]: folderId,
      }));
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

  const handleSingleDownload = async(cellValue) => {
    setFileIds([cellValue]);
  }

  const LinkComponent = ({ cell, row }) => {
    if (row.original.type !== "folder") {
      return (
        <MKButton variant="gradient" color="info" iconOnly onClick={() => handleSingleDownload(cell.value)}>
          <DownloadIcon>download</DownloadIcon>
        </MKButton>
      );
    }
    return <></>;
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
        accessor: "file_reference",
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
        setSelectedFiles,
        folderMap,
        setFolderMap
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

  function CurrentPathElement(
    currentPath,
    handlePathClick,
    data,
    selectedFiles,
    setSelectedFiles,
    folderMap,
    setFolderMap
  ) {
    const pathParts = currentPath.split("/").filter(Boolean);

    React.useEffect(() => {
      const handleDownload = () => {
        if (signedUrl) {
          const filename = (data.find((file) => file.id === fileIds[currentFileIndex])).name
          const link = document.createElement('a');
          link.href = signedUrl
          link.download = filename
          console.log(link)
          link.click();
          setTimeout(() => setCurrentFileIndex(currentFileIndex + 1), 1000);
        }
      }
      const file = data.find((file) => file.id === fileIds[currentFileIndex]); 
      console.log(file)
      handleDownload()
    }, [signedUrl]);

    React.useEffect(() => {
      const fetchNextSignedUrl = async () => {
        console.log(" currentFileIndex " + currentFileIndex);
        if (currentFileIndex < fileIds.length) {
          const response = await axios.get(BACKEND_URL + "/download/" + fileIds[currentFileIndex])
          console.log(response.data)
          setSignedUrl(response.data);
        } else {
          setSignedUrl(null);
        }
      };
      if (fileIds.length > currentFileIndex) {
        fetchNextSignedUrl();
      } else if(fileIds.length !== 0) {
        setSignedUrl(null);
        setFileIds([]);
        setCurrentFileIndex(0);
      }
    }, [fileIds, currentFileIndex]);



    const handleDownloadSelected = async() => {
      // Implement download logic for selected files
      // Iterate through selectedFiles and initiate download for each file
       console.log(selectedFiles)
       setFileIds(selectedFiles);
    }


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
          parent_node_id: folderId,
          node_name: name,
        });
        console.log(response);
        return await response.data;
      } catch (error) {
        console.error("Error generating signed URL:", error);
        return null;
      }
    };

    const confirmFileUpload = async (id) => {
      try {
        const response = await axios.post(
          BACKEND_URL + "/confirm_upload_status",
          {
            id: id,
          }
        );
        console.log(response);
        return await response.data;
      } catch (error) {
        console.error("Error confirming file status:", error);
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
        console.log(uploadData);
        const uploadResponse = await axios.put(uploadData.upload_url, file, {});
        const fileStatus = await confirmFileUpload(uploadData.id);
        setProgress((i * 100) / event.files.length);
      }

      setUploading(false);
      setFilesUploaded(event.files.length);
      setProgress(0);
      if (fileUploadRef.current) {
        fileUploadRef.current.clear();
      }
    };
    console.log(folderMap);

    return (
      <>
        <MKBox>
          <Grid container pt={2}>
            <Grid item md={10} marginLeft={2}>
              Current Path:
              <span
                className="path-link"
                onClick={() => handlePathClick("/")}
              ></span>
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
          </Grid>
          <Grid container pt={2}>
            <Grid item>
              {CreateFolder(currentPath, folderMap, setFolderMap)}
            </Grid>
            <Grid item ml={2}>
              <MKButton
                variant="gradient"
                color="info"
                onClick={handleDownloadSelected}
                size="small"
              >
                Download Selected
              </MKButton>
            </Grid>
            <Grid item ml={2}>
              <MKButton
                variant="gradient"
                color="error"
                onClick={handleDeleteSelected}
                size="small"
              >
                Delete Selected
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
            customUpload
            uploadHandler={customBase64Uploader}
            multiple
          />
          {uploading && <ProgressBar mode="determinate" value={progress} />}
        </MKBox>
      </>
    );
  }

  function CreateFolder(currentPath, folderMap, setFolderMap) {
    const [open, setOpen] = React.useState(false);
    const [folderName, setFolderName] = React.useState(""); // Step 1: Define state for folder name
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setFolderName("");
    };

    const handleCreateFolder = async () => {
      const folderId = folderMap[currentPath];
      console.log("Creating folder", folderName, " for ", folderId, ".");
      const response = await axios.post(BACKEND_URL + "/create_folder", {
        parent_id: folderId,
        name: folderName, // Pass folder name to the API call
      });
      setOpen(false);
      console.log("Received the following response: ", response.data);
      if (response.data.id != null) {
        setFolderMap((prevPathInfo) => ({
          ...prevPathInfo,
          [currentPath + "/" + folderName]: folderId,
        }));
      }
    };

    return (
      <>
        <MKButton
          variant="gradient"
          color="info"
          onClick={handleClickOpen}
          size="small"
        >
          Create Folder
        </MKButton>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleCreateFolder(); // Call handleCreateFolder when form is submitted
              handleClose();
            },
          }}
        >
          <DialogContent>
            <MKInput
              variant="outlined"
              label="Folder Name"
              id="folder_name"
              required
              value={folderName} // Step 2: Bind folderName state to the MKInput value
              onChange={(e) => setFolderName(e.target.value)} // Update folderName state when input changes
            />
          </DialogContent>
          <DialogActions>
            <MKButton onClick={handleClose} variant="text" color="info">
              Cancel
            </MKButton>
            <MKButton
              variant="gradient"
              color="info"
              type="submit"
              size="small"
            >
              Submit
            </MKButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default FilesTable;
