const moment = use("moment");

// input: 13/08/2018
// output: boolean
const isValidDate = str => {
  if (!str) return false;
  const [day, month, year] = str.split("/");
  if (+day && +month && +year) {
    return true;
  }
  return false;
};

const getMoneyFormat = (money, currency = " VNĐ") => {
  console.log("money", money);
  if (!money) money = 0;
  return money.toFixed(0).replace(/\d(?=(\d{3})+(?!\d))/g, "$&,") + currency;
};

const numberFormat = numb => {
  if (!numb) numb = 0;
  return numb.toFixed(0).replace(/\d(?=(\d{3})+(?!\d))/g, "$&,");
};

const fileSizeFormat = (bytes, si) => {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  var units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + " " + units[u];
};

const formatDateTime = (timestamp, format = "DD/MM/YYYY HH:mm:ss") => {
  if (!timestamp) return "";

  return moment(timestamp).format(format);
};

const formatOnlyDate = timestamp => {
  if (!timestamp) return "";
  return moment(timestamp).format("DD/MM/YYYY");
};

const getUnixTime = sqlDatetime => {
  // format: H:i:s 00:00:00
  if (!sqlDatetime) return null;
  const timestamp = new Date(sqlDatetime).valueOf();

  return timestamp;
};

const getUTCDate = sqlDatetime => {
  // format: H:i:s 00:00:00
  if (!sqlDatetime) return null;
  const utcDate = new Date(sqlDatetime).toISOString();

  return utcDate;
};

const isVietNamText = str => {
  return new RegExp(
    /^[a-zA-Z0-9 .,àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+$/
  ).test(str);
};

const isEnglishText = str => {
  return new RegExp(/^[a-zA-Z0-9 .,/:]+$/).test(str);
};

module.exports = {
  isValidDate,
  getMoneyFormat,
  numberFormat,
  fileSizeFormat,
  formatDateTime,
  formatOnlyDate,
  getUnixTime,
  getUTCDate,
  isVietNamText,
  isEnglishText
};
