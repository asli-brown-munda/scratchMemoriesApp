import DownloadIcon from "@mui/icons-material/Download";
import MKButton from "components/MKButton/index.js";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";

export const NameComponent = ({ cell, row, handlePathClick, currentPath }) => {
  const isFolder = row.original.type === "folder";

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
        <FolderIcon color="info" fontSize="large" />
      ) : (
        <DescriptionIcon color="info" fontSize="large" />
      )}
      <span className={isFolder ? "path-link" : ""} onClick={handleClick}>
        {cell.value}
      </span>
    </>
  );
};
