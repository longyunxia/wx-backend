const router = require('koa-router')();
const getRawBody = require('raw-body')
const tpl = require('../util/tpl')
const config = require('../config/config')
const Wechat = require('../wechat/wechat')
const wechat = new Wechat(config)
const wexinReply = require('../wechat/reply')
const contentType = require('content-type')
const sha1 = require('sha1')

const Promise = require('bluebird')
//该操作可以将原本的request方法封装成一个promise函数
const request = Promise.promisify(require('request'))


//生成随机字符串
var createNonce = function () {
  return Math.random().toString(36).substr(2, 15)
}
//生成时间戳
var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000)
}
var _sign = function (noncestr, ticket, timestamp, url) {
  var params = [
    'jsapi_ticket=' + ticket,
    'noncestr=' + noncestr,
    'timestamp=' + timestamp + '',
    'url=' + url
  ];
  var str = sha1(params.sort().join('&'));   //将参数排序然后用&进行字符串连接
  return str;
}

function sign(ticket, url) {
  var noncestr = createNonce();
  var timestamp = createTimestamp();
  var signature = _sign(noncestr, ticket, timestamp, url);
  return {
    noncestr: noncestr,
    timestamp: timestamp,
    signature: signature
  }
}

router.get('/', async (ctx, next) => {
  const signature = ctx.query.signature || ''
  const nonce = ctx.query.nonce || ''
  const timestamp = ctx.query.timestamp || ''
  const echostr = ctx.query.echostr || ''

  const token = config.token || ''
  const str = [token, timestamp, nonce].sort().join('')
  const sha = sha1(str)

  ctx.body = (sha === signature) ? echostr + '' : 'failed'

})

router.get('/voice', async (ctx) => {
  console.log('/voice')
  var access_token = wechat.access_token;
  var ticket = await wechat.fetchTicket(access_token);
  var params = sign(ticket.ticket, ctx.href);

  await ctx.render('voice', params);
})

router.post('/', async (ctx) => {
  //通过raw-body模块接收接口传过来的xml数据
  var data = await getRawBody(ctx.req, {
    length: ctx.req.headers['content-length'],
    limit: '1mb',
    encoding: contentType.parse(ctx.req).parameters.charset || 'utf-8'
  })
  var jsonObj = tpl.xmlToJson(data);
  console.log(jsonObj.xml)
  var reply = await wexinReply.reply(jsonObj.xml);
  ctx.status = 200;
  ctx.type = 'application/xml';
  ctx.body = reply;
})

router.get('/mall', async (ctx) => {
  console.log('/mall')
  console.log(ctx.query)
  var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.appID + '&secret=' + config.appSecret + '&code=' + ctx.query.code + '&grant_type=authorization_code'
  var tokenResponse = await request({method: 'GET', url: url, json: true})
  var _data = tokenResponse.body;
  console.log(_data)
  var userInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token="+_data.access_token+"&openid="+config.appID+"&lang=zh_CN"
  var userInfo = await  request({method: 'GET', url: userInfoUrl, json: true})
  console.log(userInfo.body)
  await ctx.render('mall', {userInfo: userInfo.body});
})

module.exports = router