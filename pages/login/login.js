// pages/login/login.js

const config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /**  点击登录按钮 */
  tapBtnLogin:function(e) {

    let url = config.loginUrl

    var para = {
      "system": "02",
      "password": "1b8f484d077d540a26e4cf369396aab9",
      "userName": "18987739042",
      "imei": "C75C7019-29FA-4F2B-8311-BAA6F29D1845",
      "currentVersion": "3.1.81",
      "model": "iPhone 5s (A1457\/A1518\/A1528\/A1530)",
      "clientId": "HGP",
      "type": "0",
      "accessToken": "",
      "systemVersion": "10.3.2",
      "sig": ""
    }

    wx.showLoading({ title: '登录中...' })

    util.RequestManager(url, para, function (res, fail) {

      wx.hideLoading()

      wx.setStorage({
        key: "userId",
        data: res.data.userId
      })

      wx.setStorage({
        key: "token",
        data: res.data.token
      })

      wx.navigateBack({
        delta: 1
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})