export const niceBytes = function (totalBytes) {
  const units = [
    "bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];
  let l = 0,
    n = parseInt(totalBytes, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
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


export const preProcessTableData = function (data) {
  var newArray = data.map((row) => {
    let jsonRow = JSON.parse(row)
    let newRow = {}
    newRow["link"] = "https://download.com/" + jsonRow['id'];
    newRow["id"] = jsonRow['id'];
    newRow["name"] =  jsonRow['name'];
    newRow["type"] = jsonRow['type'];
    newRow["size"] = niceBytes(2048);
    newRow["update_at"] = jsonRow['created_at'];
    newRow["extension"] = getExtension(jsonRow['name'])
    return newRow;
  });
  return newArray;
};
