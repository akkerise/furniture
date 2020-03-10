const fs = require("fs");
const _path = require("path");
const XLSX = require("xlsx");

const readFileExcel = tmpPath => {
  return new Promise((resolve, reject) => {
    fs.readFile(tmpPath, (err, data) => {
      if (err) {
        reject(err);
      }

      const workbook = XLSX.read(data, { type: "buffer", sheetStubs: true });
      const sheet_name_list = workbook.SheetNames;

      resolve(
        XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
          defval: ""
        })
      );
    });
  });
};

const readFileUpload = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file.tmpPath, (err, data) => {
      if (err) {
        reject(err);
      }

      const workbook = XLSX.read(data, { type: "buffer", sheetStubs: true });
      const sheet_name_list = workbook.SheetNames;

      resolve(
        XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
          defval: ""
        })
      );
    });
  });
};

const getColumn = index => {
  return [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ][index];
};

const exportSimpleData = (data, fileName, headerRow = {}) => {
  const page = +data.page || 1;
  const limit = +data.limit || 1000;
  const convertData = [];

  if (page == 1) {
    if (Object.keys(headerRow).length == 0) {
      headerRow = {};
      const topData = data.contents[0];
      let indexCol = 0;
      for (let fieldName in topData) {
        let column = getColumn(indexCol);
        headerRow[column] = fieldName;
        indexCol++;
      }
    }
    convertData.push(headerRow);
  }

  for (let indexRow = 0; indexRow < data.contents.length; indexRow++) {
    const itemRow = data.contents[indexRow];
    const itemConvert = {};
    let indexCol = 0;
    for (let fieldName in itemRow) {
      let column = getColumn(indexCol);
      itemConvert[column] = itemRow[fieldName];
      indexCol++;
    }
    convertData.push(itemConvert);
  }

  const file = _path.resolve(
    __dirname + "/../../public/uploads/tmp/" + fileName
  );
  const url = `/uploads/tmp/${fileName}`;
  if (page === 1) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(convertData, { skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, `Sheet1`);
    XLSX.writeFile(wb, file);
  } else {
    const wb = XLSX.readFile(file);
    const sheet_name_list = wb.SheetNames;
    let startRow = (page - 1) * limit + 2;
    XLSX.utils.sheet_add_json(wb.Sheets[sheet_name_list[0]], convertData, {
      header: ["A"],
      skipHeader: true,
      origin: `A${startRow}`
    });
    XLSX.writeFile(wb, file);
  }
  return { file, url };
};

const exportCustomData = (data, fileName) => {
  const page = +data.page || 1;
  const limit = +data.limit || 1000;
  const convertData = [];

  for (let indexRow = 0; indexRow < data.contents.length; indexRow++) {
    const itemRow = data.contents[indexRow];
    const itemConvert = {};
    for (let indexCol = 0; indexCol < itemRow.length; indexCol++) {
      let column = getColumn(indexCol);
      itemConvert[column] = itemRow[indexCol];
    }
    convertData.push(itemConvert);
  }

  const file = _path.resolve(
    __dirname + "/../../public/uploads/tmp/" + fileName
  );
  const url = `/uploads/tmp/${fileName}`;
  if (page === 1) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(convertData, { skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, `Sheet1`);
    XLSX.writeFile(wb, file);
  } else {
    const wb = XLSX.readFile(file);
    const sheet_name_list = wb.SheetNames;
    const startRow = (page - 1) * limit + 2;
    XLSX.utils.sheet_add_json(wb.Sheets[sheet_name_list[0]], convertData, {
      header: ["A"],
      skipHeader: true,
      origin: `A${startRow}`
    });
    XLSX.writeFile(wb, file);
  }
  return { file, url };
};

const browseFilePublic = folder => {
  const pathFile = _path.resolve("public" + folder);
  if (!fs.existsSync(pathFile)) {
    return null;
  }
  const data = fs.readdirSync(pathFile);
  const result = [];
  for (let index in data) {
    if ([".gitkeep"].includes(data[index]) === true) continue;
    result.push({
      fileName: data[index],
      url: folder + "/" + data[index]
    });
  }
  return result;
};

const deleteFilePublic = file => {
  const pathFile = _path.resolve("public" + file);
  if (!fs.existsSync(pathFile)) {
    return false;
  }
  fs.unlinkSync(pathFile);
  return true;
};

const deleteAllFilePublic = folder => {
  const pathFile = _path.resolve("public" + folder);
  if (!fs.existsSync(pathFile)) {
    return null;
  }
  const data = fs.readdirSync(pathFile);
  for (let index in data) {
    if ([".gitkeep"].includes(data[index]) === true) continue;
    fs.unlinkSync(_path.resolve(pathFile + "/" + data[index]));
  }
  return true;
};

module.exports = {
  readFileExcel,
  readFileUpload,
  exportSimpleData,
  exportCustomData,
  browseFilePublic,
  deleteFilePublic,
  deleteAllFilePublic
};
