import  createError from 'http-errors';
import express  from 'express';
import path  from 'path';
import cookieParser from 'cookie-parser';
import indexRouter  from './routes/index';
import usersRouter  from './routes/users';
import basicDB from './database/Sqlite';
import cors from 'cors';
import log4js, { LuxoaileLog } from './log/KttLog';
const app = express();
const LOGGER = new LuxoaileLog("app.ts");


LOGGER.log('info', '=======begin init sqlite========');
basicDB.init();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const logger = log4js.getLogger('http');
app.use(log4js.connectLogger(logger, {level: 'info'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'); 
  // res.setHeader("Content-Type", "application/json;charset=utf-8");
  next();
})

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:any) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 498);
  res.send(err);
});

module.exports = app ;
