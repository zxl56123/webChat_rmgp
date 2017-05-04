//index.js
//获取应用实例
var app = getApp()
const config = require('../../config')

Page({
  data: {
    list: []
  },

/** 跳转要闻详情页面 */
  tapHotNewsCell: function (event) {
    wx.navigateTo({
      url: 'HotNewsDetail/HotNewsDetail'
    })
  },

  onLoad: function () {
    console.log('onLoad')

    var that = this

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
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({ list: res.data.data.list })
        console.log(res)
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })




    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  }


})
