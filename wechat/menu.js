//自定义菜单的配置信息

'use strict'
module.exports = {
    "button": [
        {
            "name": "扫码", 
            "sub_button": [
                {
                    "type": "scancode_waitmsg", 
                    "name": "扫码带提示", 
                    "key": "rselfmenu_0_0", 
                    "sub_button": [ ]
                }, 
                {
                    "type": "scancode_push", 
                    "name": "扫码推事件", 
                    "key": "rselfmenu_0_1", 
                    "sub_button": [ ]
                }
            ]
        }, 
        {
            "name": "电影", 
            "sub_button": [
                {
                    "type": "click", 
                    "name": "排行榜", 
                    "key": "rselfmenu_1_0", 
                   "sub_button": [ ]
                 }, 
                {
                    "type": "click", 
                    "name": "喜剧", 
                    "key": "喜剧", 
                    "sub_button": [ ]
                }, 
                {
                    "type": "click", 
                    "name": "爱情", 
                    "key": "爱情", 
                    "sub_button": [ ]
                }
            ]
        },
        {
           "name": "其他",
           "sub_button": [
            {
                "name": "发送位置", 
                "type": "location_select", 
                "key": "location_select"
            },
             {
               "type":"view",
               "name":"进入商城",
               "url":"http://116.62.201.197/mall"
             },
             {
               "type":"view",
               "name":"语音搜索",
               "url":"http://116.62.201.197/voice"
             }
            ] 
           
        }
    ]
}
    