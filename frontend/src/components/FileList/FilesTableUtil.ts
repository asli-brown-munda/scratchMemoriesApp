export const niceBytes = function (totalBytes) {
  const units = [
    "bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
  ];
  let l = 0,
    n = parseInt(totalBytes, 10) || 0;
  while (n >= 1000 && ++l) {
    n = n / 1000;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

export const getExtension = function (filename) {
  if (!filename) {
    return undefined;
  }
  var re = /(?:\.([^.]+))?$/;
  var fileExt = re.exec(filename);
  if (fileExt && fileExt[1] && fileExt) {
    return fileExt[1];
  } else {
    return undefined;
  }
};

export const getLocalTime = function (epochs) {
  const epochNumber = parseInt(epochs);

  // Create a Date object from the epoch (milliseconds since 1970-01-01)
  const date = new Date(epochNumber);

  // Use toLocaleString() to format the date based on the browser's locale
  // and timezone, providing a user-friendly format
  const formattedDate = date.toLocaleString();

  return formattedDate.toString();
};


export const preProcessTableData = function (data) {
  var newArray = data.map((row) => {
    let jsonRow = JSON.parse(row)
    let newRow = {}
    newRow["file_reference"] = jsonRow['id'];
    newRow["id"] = jsonRow['id'];
    newRow["name"] =  jsonRow['name'];
    newRow["type"] = jsonRow['type'];
    newRow["size"] = jsonRow['type'] === 'folder' ? '' : niceBytes(jsonRow['metadata']['size']);
    newRow["updated_at"] = getLocalTime(parseInt(jsonRow['created_at']));
    newRow["extension"] = getExtension(jsonRow['name'])
    return newRow;
  });
  return newArray;
};
