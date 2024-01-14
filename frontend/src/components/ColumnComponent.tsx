
export const NameComponent = ({ cell, row, handlePathClick, currentPath }) => {
    const isFolder = row.original.type === "folder";
  
    const handleClick = () => {
      if (isFolder) {
        const folderName = row.original.name;
        if (currentPath === "/") {
            handlePathClick(`/${folderName}`);
        } else {
            handlePathClick(`${currentPath}/${folderName}`);
        }
      }
      // Add handling for other types if needed
    };
  
    return (
      <>{isFolder ? '📂' : '📄'}
      <span className={isFolder ? "path-link" : ""} onClick={handleClick}>
        {cell.value}
      </span>
      </>
    );
  };

export const LinkComponent = ({ cell, row }) => {
  if (row.original.type !== "folder") {
    return (
      <a href={cell.value} download>
        ↓
      </a>
    );
  }
  return <></>;
};
