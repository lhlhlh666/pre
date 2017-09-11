var express = require('express');
// node自带的路径模块
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose')
// 链接数据库，如果数据库不存在，则c
mongoose.connect('mongodb://127.0.0.1:27017/mongotast')

var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'hellokitty' });
var Schema = mongoose.Schema;

// 向数据库中添加
// kitty.save(function(err){
// if(err){
//   console.log(err);
// }else{
//   console.log('保存成功')
// }
// })
// Schema就是把数据库中的集合映射成对象
var Schema = mongoose.Schema;
var CatSchema = new Schema({
  name: String
})
var Cat = mongoose.model('cats', CatSchema);
/*
// 添加
Cat.insertMany([
  { name: 'cat1' }, { name: 'cat2' },
  function (err, docs) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(docs)
  }
])*/


/*修改
Cat.update({name:'小猫'},{$set:{name:'小猫2'}},function(err,result){
  if (err) {
    console.log(err)
    return;
  }
  console.log(result);
})*/
/*删除
Cat.remove({name:'小猫2'},function(err){
if(err){
  console.log(err)
}

})*/

Cat.create([{name:'aaa'}],function(err,result){
  if(err){
    console.log(err)
  }
})

// 查询
Cat.find({ name: /小猫/ }, function (err, result) {
  if (err) {
    console.log(err)
    return;
  }
  console.log(result);
})




var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 设置视图引擎
// app.engine('html')
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-mate'));
app.locals._layoutFile = 'layout.ejs';


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 把路由加到中间件里面
app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log('a')
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {
    status: err.status,
    message: "程序出错"
  };

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/**
 * 
 */

module.exports = app;
