
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
 require('./services/connection')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();


// connectDb = () => {
  const uri = process.env.DATABASE_URL
  mongoose.connect(uri)
          .then((e) => console.log('Cnnected to DB'))
          .catch((err) => console.log('err in connecteion',err))
// }
// connectDb()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
  origin : 'http://localhost:3000',
  credentials: true,
  // optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(cors())

// app.use('/', indexRouter);
app.use('/api/user', usersRouter);


const PORT = process.env.PORT || 2000;

const server = app.listen(PORT, (req, res) => {
  console.log(`server is runnig http://localhost:${PORT}/`);
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 console.log('er',err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
