// pages/shenghuo/ValuePreference/CouponDetail/CouponDetail.js
var app = getApp()
const config = require('../../../../config')
var util = require('../../../../utils/util.js')
//CouponDetailUrl
//UserCouponIdUrl
//UserCouponInfoUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponDetail: {},
    couponInfo: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let couponId = options.couponId;
    //1.网络请求-获取优惠券详情
    this.requestCouponDetail(couponId);
    //2.网络请求-获取用户优惠券表id
    this.requestUserCouponId(couponId);
  },
  /** 获取优惠券详情 */
  requestCouponDetail: function (couponIds) {
    var that = this;
    let url = config.CouponDetailUrl

    var para = {
      "couponIds": [couponIds]
    }

    wx.showLoading({ title: '加载中...' })

    util.RequestManagerWithToken(url, para, function (res, fail) {

      wx.hideLoading()

      if (res.code == app.globalData.res_success) {
        that.setData({ couponDetail: res.data[0] })
      } else {

      }

    })

  },
  /** 获取用户优惠券表id */
  requestUserCouponId: function (couponId) {
    var that = this;
    let url = config.UserCouponIdUrl;

    var userId = wx.getStorageSync('userId') //同步获取指定key对应的内容
    if (!userId) {
      // //登录无效 - 跳转到登录界面
      // wx.navigateTo({
      //   url: '/pages/login/login',
      // })
      return;
    }
    var para = {
      "couponId": couponId,
      "userId": userId
    }

    wx.showLoading({ title: '加载中...' })

    util.RequestManagerWithToken(url, para, function (res, fail) {

      wx.hideLoading()

      if (res.code == app.globalData.res_success) {
        //3.网络请求-获取用户优惠券信息
        that.requestUserCouponInfo(res.data);
      } else {

      }

    })
  },
  /** 获取用户优惠券信息 */
  requestUserCouponInfo: function (userCouponId) {
    var that = this
    let url = config.UserCouponInfoUrl

    var userId = wx.getStorageSync('userId') //同步获取指定key对应的内容
    if (!userId) {
      // //登录无效 - 跳转到登录界面
      // wx.navigateTo({
      //   url: '/pages/login/login',
      // })
      return;
    }

    var para = {
      "userCouponId": userCouponId,
      "userId": userId
    }

    wx.showLoading({ title: '加载中...' })

    util.RequestManagerWithToken(url, para, function (res, fail) {

      wx.hideLoading()

      if (res.code == app.globalData.res_success) {
        //status 优惠券的使用状态：0-未使用，1-已使用，2-已过期，3-已删除，4-已锁定
        that.setData({ couponInfo: res.data })
      } else {

      }

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