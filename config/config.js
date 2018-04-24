const path = require('path')
const ticket_file = path.join(__dirname, '../util/ticket.txt')
const util = require('../util/accessTxt')
const config = {
  port: '80',
  appID:'wx9e7ed7f7fafb8def',
  appSecret:'841a923eaa23c325299f3e6fde8b4988',
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