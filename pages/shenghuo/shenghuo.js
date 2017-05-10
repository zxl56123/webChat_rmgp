// pages/shenghuo/shenghuo.js
const shenghuoiconList = require('../../data/local-data')
const shenghuoImageList1 = require('../../data/local-data')
const shenghuoImageList2 = require('../../data/local-data')

Page({
  data: {},

  /** 点击 */
  tapGridCell: function (event) {
    console.log(event.currentTarget.dataset.iconId)
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },

  tapimageList1Cell: function (event){
    switch (event.currentTarget.dataset.iconId) {
      case 0:
      //天天有奖
      wx.navigateTo({
        url: 'ttPrize/ttPrize',
      })
      break;
      case 1:
        wx.navigateTo({
          url: 'miaosha/miaosha',
        })
      break;
      case 2:
      //一元夺宝
        wx.navigateTo({
          url: 'OnePrize/OnePrize',
        })
      break;
      default:
      break;
    }
    
    console.log(event.currentTarget.dataset.iconId)
  },

  tapimageList2Cell: function(event){
    console.log(event.currentTarget.dataset.iconId)
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(shenghuoiconList,shenghuoImageList1,shenghuoImageList2)

    this.setData(shenghuoiconList,shenghuoImageList1,shenghuoImageList2)
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