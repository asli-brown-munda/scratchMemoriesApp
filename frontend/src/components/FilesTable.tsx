import "./FilesTable.css";
import { getExtension, niceBytes } from "./FilesTableUtil.ts";

function FilesTable() {
  let testFiles = [
    {
      id: "1",
      name: "src",
      type: "folder",
      size: 1024,
      updated_at: "2019-06-11 21:24:00",
    },
    {
      id: "2",
      name: "tests",
      type: "folder",
      size: 2048,
      updated_at: "2019-07-11 21:24:00",
    },
    {
      id: "3",
      name: "README",
      type: "file",
      size: 4096,
      updated_at: "2019-07-18 21:24:00",
    },
  ];

  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th />
            <th>Name</th>
            <th>Date Modified</th>
            <th>Size</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {testFiles.map((file) => (
            <FileListItem file={file} radius={1} type={"image"} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FileListItem({ file }) {
  return (
    <tr id={file.id}>
      <FileName file={file} />
      <Time timestamp={file.updated_at} />
      <Size size={file.size} />
    </tr>
  );
}

const FileName = ({ file }) => (
  <td>
    <FileIcon size={64} extension="docx" {...defaultStyles.docx} />
    {file.name}
  </td>
);

const Time = ({ timestamp }) => {
  return <td>{timestamp}</td>;
};

const Size = ({ size }) => {
  return <td>{niceBytes(size)}</td>;
};

const FileIcon = ({filename}) => {
  filExt = getExtension(filename);
};

export default FilesTable;
