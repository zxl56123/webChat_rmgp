// pages/shenghuo/SelectedGoods/SelectedGoods.js

const config = require('../../../config')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertCaroucelsAr: [], /** 轮播数据 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestAdvertCaroucels()
  },
  requestAdvertCaroucels: function (e) {
    var that = this;
    let url = config.AdvertCaroucelsUrl

    var para = {
      "category": 4
    }

    wx.showLoading({ title: '加载中...' })

    util.RequestManager(url, para, function (res, fail) {

      wx.hideLoading()
      that.setData({ advertCaroucelsAr: res.data })

    })
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