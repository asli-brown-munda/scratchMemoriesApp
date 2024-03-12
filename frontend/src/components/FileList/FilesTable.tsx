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
import DownloadIcon from "@mui/icons-material/Download";
import { useContext } from "react";
import { UserContext } from "context/UserContext";
import MKTypography from "components/MKTypography";

function FilesTable() {
  // Sets the path which in turn retrieves the data.
  const [currentPath, setCurrentPath] = React.useState(() => "/root");
  const [data, setData] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectAllChecked, setSelectAllChecked] = React.useState(false);
  const [folderMap, setFolderMap] = React.useState({ "/root": "root" });

  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);

  const [fileIds, setFileIds] = React.useState([]);
  const [currentFileIndex, setCurrentFileIndex] = React.useState(0);
  const [signedUrl, setSignedUrl] = React.useState(null);

  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deletionProgress, setDeletionProgress] = React.useState(0);

  React.useEffect(() => {
    const folderId = folderMap[currentPath];
    fetchFileList(folderId)
      .then((response) => setData(response))
      .catch((error) => console.error("Error fetching file list:", error));
  }, [currentPath, folderMap, uploading, isDeleting]);

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

  const handleFolderDelete = async(folderId) => {
    setIsDeleting(true);
    const response = await axios.delete(BACKEND_URL + "/delete/" + folderId);
    const status = await response.data;
    console.log(status);
    setIsDeleting(false);
  }

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
    setSelectAllChecked((prevSelectAllChecked) => {
      return !prevSelectAllChecked;
    });
  };

  React.useEffect(() => {
    setSelectedFiles((prevSelectedFiles) => {
      if (selectAllChecked) {
        return data.filter((file) => file.type === 'file').map((file) => file.id);
      } else {
        return [];
      }
    });
  }, [selectAllChecked]);

  const handleSingleDownload = async (cellValue) => {
    setFileIds([cellValue]);
  };

  const LinkComponent = ({ cell, row }) => {
    if (row.original.type !== "folder") {
      return (
        <MKButton
          variant="gradient"
          color="info"
          iconOnly
          onClick={() => handleSingleDownload(cell.value)}
        >
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
            handleFolderDelete={handleFolderDelete}
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
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { user, setUser } = useContext(UserContext);
    const openDialog = () => {
      setIsDialogOpen(true);
    };
    const closeDialog = () => {
      setIsDialogOpen(false);
    };
    const refresh_user_object = () => {
      axios.post(BACKEND_URL + "/protected_area").then((response) => {
        console.log("Session Still exists for the user", response.data);
        if (response.data !== user) {
          setUser(response.data);
        }
      });
    };

    React.useEffect(() => {
      const handleDownload = () => {
        if (signedUrl) {
          const filename = data.find(
            (file) => file.id === fileIds[currentFileIndex]
          ).name;
          const link = document.createElement("a");
          link.href = signedUrl;
          link.download = filename;
          console.log(link);
          link.click();
          setTimeout(() => setCurrentFileIndex(currentFileIndex + 1), 1000);
        }
      };
      const file = data.find((file) => file.id === fileIds[currentFileIndex]);
      console.log(file);
      handleDownload();
    }, [signedUrl]);

    React.useEffect(() => {
      const fetchNextSignedUrl = async () => {
        console.log(" currentFileIndex " + currentFileIndex);
        if (currentFileIndex < fileIds.length) {
          const response = await axios.get(
            BACKEND_URL + "/download/" + fileIds[currentFileIndex]
          );
          console.log(response.data);
          setSignedUrl(response.data);
        } else {
          setSignedUrl(null);
        }
      };
      if (fileIds.length > currentFileIndex) {
        fetchNextSignedUrl();
      } else if (fileIds.length !== 0) {
        setSignedUrl(null);
        setFileIds([]);
        setCurrentFileIndex(0);
      }
      refresh_user_object();
    }, [fileIds, currentFileIndex]);

    const handleDownloadSelected = async () => {
      // Implement download logic for selected files
      // Iterate through selectedFiles and initiate download for each file
      console.log(selectedFiles);
      setFileIds(selectedFiles);
    };

    const handleDeleteSelected = async () => {
      var totalFile = selectedFiles.length;
      var deletedFiles = 0;
      setIsDeleting(true);
      for (let i = 0; i < selectedFiles.length; ++i) {
        const fileId = selectedFiles[i];
        const response = await axios.delete(BACKEND_URL + "/delete/" + fileId);
        const status = await response.data;
        console.log(status);
        deletedFiles += 1;
        setDeletionProgress((deletedFiles * 100) / totalFile);
        console.log(deletionProgress);
      }
      setIsDeleting(false);
      refresh_user_object();
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
      let totalSize = 0;
      let uploadedSize = 0;
      for (let i = 0; i < event.files.length; ++i) {
        totalSize += event.files[i].size;
      }
      for (let i = 0; i < event.files.length; ++i) {
        const file = event.files[i]; // Use 'i' to iterate through all files

        // generate signed url
        const uploadData = await generateSignedUrl(file.name, folderId);
        console.log(uploadData);

        const uploadResponse = await axios.put(uploadData.upload_url, file, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(((uploadedSize + progressEvent.loaded) * 100) / totalSize);
          },
        });
        uploadedSize += file.size;
        const fileStatus = await confirmFileUpload(uploadData.id);
        console.log("uploadedSize: " + uploadedSize + " totalSize: " + totalSize);
      }

      setUploading(false);
      setProgress(0);
      refresh_user_object();
      closeDialog();
      if (fileUploadRef.current) {
        fileUploadRef.current.clear();
      }
    };
    console.log(folderMap);

    return (
      <>
        <MKBox>
          <Grid container pt={4}>
            <Grid item>
              {CreateFolder(currentPath, folderMap, setFolderMap, data)}
            </Grid>
            <Grid item ml={2}>
              <MKButton
                variant="gradient"
                color="info"
                onClick={openDialog}
                size="small"
              >
                Upload Files
              </MKButton>
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
                disabled={isDeleting} // Disable button while deleting
              >
                {isDeleting ? "Deleting..." : "Delete Selected"}
              </MKButton>
              {isDeleting && (
                <ProgressBar
                  value={deletionProgress}
                  style={{ height: "3px" }}
                  variant="determinate"
                  bg="red"
                />
              )}
            </Grid>
          </Grid>
          <br></br>
          <MKBox
            color="black"
            bgColor="text.disabled"
            variant="gradient"
            borderRadius="lg"
            shadow="lg"
            opacity={1}
            p={2}
            sx={{backgroundColor: "#f8f9fa", borderBottom: 1, borderColor: "#c6c7c8"}}
          >
            <Grid container>
              <Grid item pl={0.5} >
                <MKButton variant="outlined" color="info" size="small">
                  Current Path:{" "}
                </MKButton>
              </Grid>
              {pathParts.map((part, index) => (
                <>
                  <Grid item key={index} pl={0.5}>
                    <MKButton
                      color="info"
                      size="small"
                      onClick={() =>
                        handlePathClick(
                          `/${pathParts.slice(0, index + 1).join("/")}`
                        )
                      }
                    >
                      {part}
                    </MKButton>
                    <MKTypography color="info" variant="button" >
                      {" "}
                      {index < pathParts.length - 1 && " > "}{" "}
                    </MKTypography>
                  </Grid>
                </>
              ))}
            </Grid>
          </MKBox>
        </MKBox>
        <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth={"xl"}>
          <FileUpload
            ref={fileUploadRef}
            name="Uploader"
            accept="*"
            customUpload
            uploadHandler={customBase64Uploader}
            multiple
            progressBarTemplate={() => (
              <ProgressBar mode="determinate" value={Math.round(progress)} style={{ visibility: uploading ? 'visible' : 'hidden' }} />
            )}
          />
        </Dialog>
      </>
    );
  }

  function CreateFolder(currentPath, folderMap, setFolderMap, data) {
    const [open, setOpen] = React.useState(false);
    const [folderName, setFolderName] = React.useState("");
    const [error, setError] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setFolderName("");
      setError("");
    };

    const validateFolderName = (name) => {
      if (name.trim() === "") {
        setError("Folder name cannot be empty");
        return;
      }
      if (data != null) {
        var found = false;
        data.forEach((item) => {
          if (item.name === name && item.type === "folder") {
            found = true;
          }
        });
        if (found) {
          setError("Folder name already exists");
          return;
        }
      }
      setError("");
    };

    const handleCreateFolder = async () => {
      if (!!error) {
        return;
      }
      const folderId = folderMap[currentPath];
      console.log("Creating folder", folderName, " for ", folderId, ".");
      const response = await axios.post(BACKEND_URL + "/create_folder", {
        parent_id: folderId,
        name: folderName, // Pass folder name to the API call
      });
      handleClose();
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
              handleCreateFolder();
            },
          }}
        >
          <DialogContent>
            <MKInput
              variant="outlined"
              label="Folder Name"
              id="folder_name"
              required
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                validateFolderName(e.target.value);
              }}
              error={!!error} // Pass error state to MKInput for error display
              helperText={error} // Display error message
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
