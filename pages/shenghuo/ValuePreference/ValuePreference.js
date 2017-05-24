const config = require('../../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabIndex: 0,
    CouponCategoryList: [],

    content: [],
    priceAndDistance: [],
    quancheng: [],
    priceopen: false,
    quanchengopen: false,
    priceshow: false,
    quanchengshow: false,
    priceSelectedName: "面额最高",
    quanchengSelectedName: "全城",
    isfull: false,

    shownavindex: ''

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
    this.setData({
      priceAndDistance: ['离我最近', '面额最高'],
      quancheng: ['1千米', '3千米', '5千米', '10千米', '全城']
    })

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
        var index = 0;
        for (var i = 0; i < res.data.data.length; i++) {
          let model = res.data.data[i];
          let array = model["nextCate"];
          for (var j = 0; j < array.length; j++) {
            let model_j = array[j];
            var temp = {};
            temp["id"] = index;
            temp["count"] = model_j["count"];
            temp["cateName"] = model_j["cateName"];
            dic.push(temp);
            index++;
          }
        }

        that.setData({ CouponCategoryList: dic })
        //console.log(that.data.CouponCategoryList)

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

  },
  
  listprice: function (e) {
    if (this.data.priceopen) {
      this.setData({
        priceopen: false,
        quanchengopen: false,

        priceshow: false,
        quanchengshow: true,

        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.priceAndDistance,
        priceopen: true,
        quanchengopen: false,

        priceshow: false,
        quanchengshow: true,

        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  listquancheng: function (e) {
    if (this.data.quanchengopen) {
      this.setData({
        priceopen: false,
        quanchengopen: false,

        priceshow: true,
        quanchengshow: false,

        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.quancheng,
        priceopen: false,
        quanchengopen: true,

        priceshow: true,
        quanchengshow: false,

        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },
  tapPriceCell: function (e) {
    this.listprice("1")
    let index = e.currentTarget.dataset.index
    this.setData({ priceSelectedName: this.data.priceAndDistance[index] })
    console.log(this.data.priceSelectedName)
  },
  tapQuanchengCell: function (e) {
    this.listquancheng("2")
    let index = e.currentTarget.dataset.index
    this.setData({ quanchengSelectedName: this.data.quancheng[index] })
    console.log(this.data.quanchengSelectedName)
  },


  hidebg: function (e) {

    this.setData({
      qyopen: false,
      priceopen: false,
      quanchengopen: false,
      priceshow: true,
      quanchengshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0
    })
  }
})