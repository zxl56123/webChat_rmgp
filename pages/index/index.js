//index.js
//获取应用实例
var app = getApp()
const config = require('../../config')
const iconList = require('../../data/four-icon-data')

var pageNo = 0;
Page({
  data: {
    list: [],
  },

  /** 跳转（政务资讯、办事指南、办事大厅、办事攻略） */
  tapGridCell: function (event) {
    switch (event.currentTarget.dataset.iconId) {
      case 0:
        console.log("点击政务资讯")
        break
      case 1:
        console.log("点击办事指南")
        break
      case 2:
        console.log("点击办事大厅")
        break
      case 3:
        console.log("点击办事攻略")
        break
    }

     wx.navigateTo({
      url: 'temp/temp'
    })
  },

  /** 跳转要闻详情页面 */
  tapHotNewsCell: function (event) {
    wx.navigateTo({
      url: 'HotNewsDetail/HotNewsDetail'
    })
  },

  /** 下拉刷新 */
  loadNewData: function () {
    pageNo = 1;
    this.requestData()

  },

  loadNewData_NextPage: function () {
    pageNo += 1;
    this.requestData();
  },

  requestData: function () {
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
        "pageNo": pageNo,
        "model": "iPhone 6s Plus (A1699)",
        "pageSize": "20"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        // success
        if (pageNo == 1) {
          that.setData({ list: res.data.data.list })
          
        }else {
          that.setData({ list: that.data.list.concat(res.data.data.list) })

        }

        console.log(that.data.list)
        
      },
      fail: function (res) {
        // fail
        pageNo--;
      },
      complete: function (res) {
        // complete
        wx.stopPullDownRefresh()
      }
    })

  },


  onLoad: function () {
    console.log('onLoad')

    console.log(iconList)
    this.setData(iconList)
    this.loadNewData();

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
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    this.loadNewData();

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log("onReachBottom")
    
    this.loadNewData_NextPage()
  },


})
