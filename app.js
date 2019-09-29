const createError = require("http-errors");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
// const validator = require('express-validator');
const logger = require("morgan");
const csurf = require("csurf");
const engine = require('ejs-locals');
let api = require("./routes/api");
const app = express();

// View engine setup
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger("dev"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(validator());
app.use(cookieParser());
app.use(session({ secret: "thanhna", resave: true, saveUninitialized: false }));
app.use(flash());

// Mount api before csrf is appended to the app stack
app.use("/api", api);

// Require form input send to server have an csrfToken
app.use(csurf({ cookie: true }));
app.use(function(err, req, res, next) {
  var token = req.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

const routes = require(__dirname + "/routes");
app.use(routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  return res.render("pages/error/500");
});

module.exports = app;
