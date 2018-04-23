const path = require('path')
const ticket_file = path.join(__dirname, '../util/ticket.txt')
const util = require('../util/accessTxt')
const config = {
  port: '80',

  appID:'wx1d16be82d72d5085',
  appSecret:'6a2dd0b0de7063074371a6c80fec5460',
  token:'weixin',
  //获取access_token
  getAccessToken: function () {
    return util.readFileAsync(wechat_file)
  },
  //保存access_token
  saveAccessToken: function (data) {
    data = JSON.stringify(data)
    return util.writeFileAsync(wechat_file, data)
  },
  //获取ticket
  getTicket: function () {
    return util.readFileAsync(ticket_file)
  },
  //保存ticket
  saveTicket: function (data) {
    data = JSON.stringify(data)
    return util.writeFileAsync(ticket_file, data)
  },
}

module.exports = config