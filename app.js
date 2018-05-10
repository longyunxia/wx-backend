const koa = require('koa')
const app = new koa()
const router = require('./router/index');
const config = require('./config/config')
const render = require('koa-ejs');
const path = require('path');

render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
});

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(config.port, function () {
  console.log('this server is listening at port '+ config.port);
});