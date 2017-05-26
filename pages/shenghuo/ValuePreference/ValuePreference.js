const config = require('../../../config')
var util = require('../../../utils/util.js')
var locationManager = require('../../../utils/locationManager.js')

let TENCENT_KEY = "AJPBZ-S6MRU-NFIVK-4BH5A-IZA57-OKB24"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    localCtiyName: "定位中...",  /** 当前定位城市 */
    currentTabIndex: 0,
    CouponCategoryList: [], /** 好优惠分类列表 */
    CouponSearchList: [], /** 好优惠搜索列表 */
    
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

    /** 获取定位 */
    util.getLocation((successRes, failRes) => {
      console.log(successRes)
      console.log(failRes)
      // var location = locationManager.gcj02tobd09(successRes.longitude, successRes.latitude)
      // this.loadCity(location[0], location[1])

      var location = locationManager.wgs2bd(successRes.longitude, successRes.latitude)
      this.loadCity(location[0], location[1])

      // this.loadCity(successRes.longitude, successRes.latitude)
    }),

      this.requestCouponCategory("玉溪市")

    this.requestCouponSearchList("本地生活", "美食", "玉溪市")
  },

  // processCouponCategoryData: function (successRes, failRes) {
  //   console.log(successRes)
  //   console.log(failRes)
  // },

  /** 获取定位城市 */
  loadCity: function (longitude, latitude) {
    var that = this

    console.log('https://api.map.baidu.com/geocoder/v2/?ak=0FuoX30MFf7YMrdS5Wi9GGAcHBblKDuu&callback=?&location=' + latitude + ',' + longitude + '&output=json')
    
    wx.request({

      // url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=' + TENCENT_KEY,  
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=0FuoX30MFf7YMrdS5Wi9GGAcHBblKDuu&callback=?&location=' + latitude + ',' + longitude + '&output=json',

      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        console.log(res);

        // that.setData({
        //   nation: res.data.result.address_component.nation,
        //   province: res.data.result.address_component.province,
        //   city: res.data.result.address_component.city,
        //   district: res.data.result.address_component.district,
        //   street: res.data.result.address_component.street,
        //   street_number: res.data.result.address_component.street_number
        // })

        //console.log(that.data.nation, that.data.province, that.data.city)

        var city = res.data.result.addressComponent.city;
        that.setData({ localCtiyName: city });
        console.log(city);
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
  },


  requestCouponCategory: function (cityName) {

    var that = this;
    let url = config.couponCategoryUrl

    var para = {
      "city": cityName,
      "country": null
    }

    util.RequestManager(url, para, function (res, fail) {

      var dic = new Array()
      var index = 0;
      for (var i = 0; i < res.data.length; i++) {
        let model = res.data[i];
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

      // console.log(that.data.CouponCategoryList)

    })
  },

  /** 好优惠搜索 */
  requestCouponSearchList: function (doorCateName, fcName, cityName) {

    var that = this

    wx.request({
      url: config.CouponSearchListUrl,
      data: {
        "pageNum": 1,
        "pageSize": 20,
        "doorCateName": doorCateName,
        "fcName": fcName,
        "position": {
          "distance": null,
          "latitude": null,
          "longitude": null
        },
        "sortType": 1,
        "city": cityName,
        "country": null
      },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: '',
      success: function (res) {


        that.setData({ CouponSearchList: res.data.data.dataList })
        console.log(that.data.CouponSearchList)

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
    this.listprice("") /** 点击收起下拉菜单 */
    let index = e.currentTarget.dataset.index
    this.setData({ priceSelectedName: this.data.priceAndDistance[index] })
    console.log(this.data.priceSelectedName)
  },
  tapQuanchengCell: function (e) {
    this.listquancheng("") /** 点击收起下拉菜单 */
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