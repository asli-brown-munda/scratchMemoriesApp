import DownloadIcon from "@mui/icons-material/Download";
import MKButton from "components/MKButton/index.js";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from "@mui/icons-material/Description";
import IconButton from '@mui/material/IconButton';
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export const NameComponent = ({ cell, row, handlePathClick, currentPath, handleFolderDelete}) => {
  const isFolder = row.original.type === "folder";
  const [isHovering, setIsHovering] = React.useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = React.useState(false);


  const handleHover = () => setIsHovering(true);
  const handleLeave = () => setIsHovering(false);

  const handleOpenDeleteConfirmation = () => setOpenDeleteConfirmation(true);
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

  const handleDelete = () => {
    handleFolderDelete(row.original.id); // Pass the folder object to the deletion handler
    setOpenDeleteConfirmation(false); // Close popup after deletion
  };

  const handleClick = () => {
    if (isFolder) {
      const folderName = row.original.name;
      const folderId = row.original.id;
      const pathToIdMap = {}
      if (currentPath === "/") {
        handlePathClick(`/${folderName}`, `${folderId}`);
      } else {
        handlePathClick(`${currentPath}/${folderName}`, `${folderId}`);
      }
    }
    // Add handling for other types if needed
  };

  return (
    <>
      {isFolder ? (
       <span onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          {!isHovering && 
            <FolderIcon color={isHovering ? 'error' : 'info'} fontSize="large" />}
          {isHovering && <IconButton onClick={handleOpenDeleteConfirmation}>
            <DeleteIcon color='error' fontSize="large"/>
          </IconButton>}
        </span>
      ) : (
        <DescriptionIcon color="info" fontSize="large" />
      )}
      <span className={isFolder ? "path-link" : ""} onClick={handleClick}>
        {cell.value}
      </span>
      <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{row.original.name}"? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <MKButton onClick={handleCloseDeleteConfirmation}>Cancel</MKButton>
          <MKButton onClick={handleDelete} variant="contained" color="error">
            Delete
          </MKButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
