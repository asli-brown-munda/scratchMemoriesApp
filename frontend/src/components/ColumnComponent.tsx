export const NameComponent = ({ cell, row }) => {
  if (row.original.type !== "folder") {
    return <>📄 {cell.value}</>;
  }
  return <>📂 {cell.value}</>;
};

export const LinkComponent = ({ cell, row }) => {
  if (row.original.type !== "folder") {
    return (
      <a href={cell.value} download>
        📥
      </a>
    );
  }
  return <></>;
};
