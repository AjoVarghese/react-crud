var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
require("./services/connection");
var usersRouter = require("./routes/users");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//cacheControl
app.use(function (req, res, next) {
  if (!req.user) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
  }
  next();
});

//session
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000000 },
  })
);

//cors
const corsOptions = {
  origin: "https://crud-client-9tll.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

//route
app.use("/api/user", usersRouter);

const PORT = process.env.PORT || 2000;

const server = app.listen(PORT, (req, res) => {
  console.log(`server is runnig http://localhost:${PORT}/`);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
