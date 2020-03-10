"use strict";

const log4js = require("log4js");
const _path = require("path");
const os = require("os");

require("dotenv").config();

/**
 * Cấu hình Log4js
 */
log4js.addLayout("json", function(config) {
  return function(logEvent) {
    const time = new Date(
      new Date(logEvent.startTime).toString().split("GMT")[0] + " UTC"
    )
      .toISOString()
      .split(".")[0];
    const data = JSON.parse(logEvent.data[0]);
    return (
      JSON.stringify(
        Object.assign({ time: time, level: logEvent.level.levelStr }, data)
      ) + config.separator
    );
  };
});
log4js.configure({
  appenders: {
    anything: {
      type: "dateFile",
      filename: _path.resolve(__dirname + "/../../logs/log-"),
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      compress: true,
      layout: { type: "json", separator: "" },
      maxLogSize: 104857600,
      backups: 100
    }
  },
  categories: {
    error: { appenders: ["anything"], level: "error" },
    response: { appenders: ["anything"], level: "info" },
    default: { appenders: ["anything"], level: "info" }
  },
  replaceConsole: true,
  pm2: true,
  disableClustering: false
});

/**
 * Lưu trữ error log vào file
 * @param {*} error
 */
const errLogger = data => {
  const { func, message } = data;
  if (func && message) {
    const msg = Object.assign(
      {
        server: os.hostname(),
        requestId: global.__requestId,
        method: global.__method,
        url: global.__url
      },
      data
    );
    log4js.getLogger("error").error(JSON.stringify(msg));
  }
};

/**
 * Lưu trữ response log vào file
 * @param {*} res
 */
const msgLogger = data => {
  console.log("msgLogger");
  const { func, message } = data;
  if (func && message) {
    const msg = Object.assign(
      {
        server: os.hostname(),
        requestId: global.__requestId,
        method: global.__method,
        url: global.__url
      },
      data
    );
    log4js.getLogger("Response.js").info(JSON.stringify(msg));
  }
};

module.exports = {
  errLogger,
  msgLogger
};
