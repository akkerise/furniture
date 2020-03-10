"use strict";

/*
 * adonis-spread-sheet
 *
 * (c) Artem Kolesnik <kolesnik.artem.g@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const xlsx = use("xlsx");
const _path = require("path");

class SpreadSheet {
  /**
   * @param {Response} response
   * @param {string} format
   */
  constructor(response, format) {
    this.response = response;
    this.format = format;
    this.wb = xlsx.utils.book_new();
  }

  /**
   * @param {String} name
   * @param {Array} data
   */
  addSheet(name, data) {
    const ws = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(this.wb, ws, name);
  }

  /**
   * @return {Array}
   */
  static get formats() {
    return {
      ods: {
        bookType: "ods",
        header: "application/vnd.oasis.opendocument.spreadsheet"
      },
      xls: {
        bookType: "xlml",
        header: "application/vnd.ms-excel"
      },
      xlsx: {
        bookType: "xlsx",
        header:
          "application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      },
      csv: {
        bookType: "csv",
        header: "application/csv"
      }
    };
  }

  /**
   * @param {String} filename
   */
  download(filename) {
    const buffer = xlsx.write(this.wb, {
      bookType: this.constructor.formats[this.format].bookType,
      type: "buffer"
    });

    this.response.header(
      "Content-Type",
      `${this.constructor.formats[this.format].header}; charset=UTF-8`
    );
    this.response.header(
      "Content-Disposition",
      `attachment; filename="${filename}.${this.format}"`
    );
    this.response.send(buffer);
  }

  saveFile(data, sheet_name, fileName) {
    const file = _path.resolve(
      __dirname + "/../../public/uploads/tmp/" + fileName + ".xlsx"
    );
    const url = `/uploads/tmp/${fileName}.xlsx`;
    const ws = xlsx.utils.aoa_to_sheet(data, { header: 1 });
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, sheet_name);
    xlsx.writeFile(wb, file);
    return { file, url };
  }
}

module.exports = SpreadSheet;
