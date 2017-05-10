// pages/shenghuo/OnePrize/OnePrize.js
const config = require('../../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    onePrizeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.onePrizeUrl,
      data: {
        "pageNum": 1,
        "pageSize": 10
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success

        // that.setData({ onePrizeList: res.data.data.prdList })
        // console.log(that.data.onePrizeList)
        that.handleResponseData(res.data.data.prdList)
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  handleResponseData: function (dataList) {
    var tempList = [];
    for (var idx in dataList) {
      var subject = dataList[idx];
      var title = subject.name;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        name: title,
        preImgUrl: "http://m.jointem.com/" + subject.preImgUrl,
        OnePrizeid: subject.id
      }
      
      tempList.push(temp)
    }

    this.setData({ onePrizeList: tempList })
    console.log(this.data.onePrizeList)

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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})