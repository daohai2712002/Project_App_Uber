var createError = require('http-errors');
var express = require('express');
var path = require('path');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sliderRouter = require('./routes/slider');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const { default: mongoose } = require('mongoose');
const authController = require('./controllers/authController');
dotenv.config();

// mongoose.connect(process.env.MONGO_URL,()=>{
//   console.log("Connect database success!");
// });
mongoose.connect(
  process.env.MONGO_URL,
  (err) => {
   if(err) console.log(err) 
   else console.log("mongdb is connected");
  }
);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);

//ROUTES
app.use('/users', usersRouter);
app.use('/slider', sliderRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
