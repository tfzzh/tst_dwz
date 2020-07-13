var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let configRouter = require('./routes/config'); // add xwj 2020-07-11
const { assert } = require('console');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
configRouter.regist(app); // add xwj 2020-07-11

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const model_dwz = require('./model/dwz'); // add xwj 2020-07-11
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // change xwj 2020-07-11
  console.log('app err req >> ['+req.url+']');
  let path = req.url.substr(1);
  assert(path.length === 8, 'app req maybe short link ['+path+'] ... ');
  if (path.length === 8) {// 这里暂定短code一定是8位长
    // 这里未进行更多判定，直接进行数据库获取
    model_dwz.info(path, req._remoteAddress, (derr, data)=>{
      if (derr) {
      } else {
        if (data && data.tar_url) {
          // 因为存在目标，所以进行目标跳转
          res.redirect(data.tar_url);
          return;
        }
      }
      // 去到错误页面
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      showErrorPage(err, res);
    });
  } else {
    // 去到错误页面
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    showErrorPage(err, res);
  }
});
/**
 * 错误页面显示
 * @author xwj 2020-07-11
 * @param {any} err 
 * @param {Response} res 
 */
function showErrorPage (err, res) {
  res.locals.message = err.message;
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.render('error');
}

module.exports = app;
