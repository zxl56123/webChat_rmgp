// pages/shenghuo/shenghuo.js
const shenghuoiconList = require('../../data/local-data')
Page({
  data: {},

  /** 点击 */
  tapGridCell: function () {


  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(shenghuoiconList)
    this.setData(shenghuoiconList)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})