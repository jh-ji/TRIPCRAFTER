const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
const indexRouter = require('./routes');
const postsRouter=require('./routes/posts');
const usersRouter=require('./routes/users1');
const schedulesRouter=require('./routes/schedules');
const scheduleslistRouter=require('./routes/scheduleslist');
const app = express();
app.set('port', process.env.PORT || 3002);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '200mb'}) );  
app.use(express.urlencoded({
    limit: '200mb',
    extended: true,  
    parameterLimit:2000000
}));


app.use('/posts',postsRouter);
app.use('/users',usersRouter);
app.use('/schedules',schedulesRouter);
app.use('/scheduleslist',scheduleslistRouter);
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
}); 

