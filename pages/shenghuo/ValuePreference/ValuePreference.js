const config = require('../../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabIndex: 0,
    CouponCategoryList: []
  },
  clickOrderTab: function (e) {
    //data = {};

    var dataset = e.target.dataset

    this.setData({ currentTabIndex: dataset.index })

    // var index = parseInt(dataset.index)
    // if (this.data.list[index]) {
    //   //有数据
    //   //nothing
    // } else {
    //   //没有数据
    //   this.loadNewData(this.data.currentTabIndex);
    // }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestCouponCategory("玉溪市")
  },

  requestCouponCategory: function (cityName) {

    var that = this;

    wx.request({
      url: config.couponCategoryUrl,
      data: {
        "city": cityName,
        "country": null
      },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: '',
      success: function (res) {
        var dic = new Array()
        for (var i = 0; i < res.data.data.length; i++) {
          let model = res.data.data[i];
          let array = model["nextCate"];
          for (var j = 0; j < array.length; j++) {
            let model_j = array[j];
            var temp = {};
            temp["id"] = i + j;
            temp["count"] = model_j["count"];
            temp["cateName"] = model_j["cateName"];
            dic.push(temp);
          }
        }

        that.setData({ CouponCategoryList: dic })
        console.log(that.data.CouponCategoryList)

      },
      fail: function (res) { },
      complete: function (res) { },
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