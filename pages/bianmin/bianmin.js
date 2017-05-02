// pages/bianmin/bianmin.js

const config = require('../../config')
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  console.log("页面显示")

  wx.showToast({
  title: '成功123',
  icon: 'success',
  duration: 1500
})

console.log("--" + config.GET_HOT_NEWS + "---")

  wx.request({
    url: config.GET_HOT_NEWS,
    data: {
    "system": "02",
    "tagId": "1",
    "accessToken": "",
    "scopeAddressCode": "",
    "key": "",
    "systemVersion": "10.3.1",
    "imei": "A902EA47-B1B2-452A-96FB-4C7BCCBB149C",
    "currentVersion": "3.1.6",
    "sig": "",
    "pageNo": "1",
    "model": "iPhone 6s Plus (A1699)",
    "pageSize": "20"
  },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
      }, // 设置请求的 header
    success: function(res){
      // success
      console.log(res.data)

    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      // complete
    }
})

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})