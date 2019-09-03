var createError = require("http-errors");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");
var session = require("express-session");
var logger = require("morgan");
var csrf = require("csurf");
var api = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "thanhna", resave: true, saveUninitialized: false }));
app.use(flash());

// mount api before csrf is appended to the app stack
app.use("/api", api);

// require form input send to server have an csrfToken
app.use(csrf({ cookie: true }));
app.use(function(err, req, res, next) {
  var token = req.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

const routes = require(__dirname + "/routes");
app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
