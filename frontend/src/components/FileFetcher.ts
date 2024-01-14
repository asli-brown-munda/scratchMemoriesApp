import { preProcessTableData } from "./FilesTableUtil.ts";

export const fetchFiles = function (directory = "/") {
  if (directory === "/") {
    return preProcessTableData([
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
      {
        id: "4",
        name: "random_list.txt",
        type: "file",
        size: 4096,
        updated_at: "2019-07-18 21:24:00",
      },
    ]);
  } else if (directory === "/src") {
    return preProcessTableData([
      {
        id: "1",
        name: "newFolder",
        type: "folder",
        size: 1024,
        updated_at: "2019-06-11 21:24:00",
      },
      {
        id: "4",
        name: "main.java",
        type: "file",
        size: 4096,
        updated_at: "2019-07-18 21:24:00",
      },
    ]);
  } else if (directory === "/src/newFolder") {
    return preProcessTableData([
      {
        id: "1",
        name: "newFolder",
        type: "folder",
        size: 1024,
        updated_at: "2019-06-11 21:24:00",
      },
      {
        id: "4",
        name: "different.txt",
        type: "file",
        size: 4096,
        updated_at: "2019-07-18 21:24:00",
      },
    ]);
  } else {
    return preProcessTableData([]);
  }
};
