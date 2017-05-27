const config = require('../../../config')
var util = require('../../../utils/util.js')
var locationManager = require('../../../utils/locationManager.js')

let TENCENT_KEY = "AJPBZ-S6MRU-NFIVK-4BH5A-IZA57-OKB24"

var selectedCategoryName = ""; /** 当前选中的分类名称 */
var selectedfcName = "";       /** 当前选中的具体类型名称 */

var pageNo = new Array();
var dic = new Array();

var longt = ""
var lati = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    localCtiyName: "定位中...",  /** 当前定位城市 */
    currentTabIndex: 0,
    couponCategoryList: [], /** 好优惠分类列表 */
    couponSearchList: [], /** 好优惠搜索列表 */

    content: [],
    priceAndDistance: [],
    quancheng: [],
    priceopen: false,
    quanchengopen: false,
    priceshow: false,
    quanchengshow: false,
    priceSelectedName: "离我最近",
    quanchengSelectedName: "全城",
    isfull: false,

    shownavindex: ''

  },

  scroll: function (e) {

    // console.log(e)
  },
  clickOrderTab: function (e) {
    //data = {};
    var index = parseInt(e.target.dataset.index)

    this.setData({ currentTabIndex: index })

    /** 选中的分类名字 */
    selectedCategoryName = this.data.couponCategoryList[index]["CategoryName"];
    /** 选中的具体类型名字 */
    selectedfcName = this.data.couponCategoryList[index]["cateName"];


    if (this.data.couponSearchList[index]) {
      //有数据
      //nothing
    } else {
      //没有数据
      /** 网络请求: 按条件搜索 */
      this.loadNewData(selectedCategoryName, selectedfcName, this.data.localCtiyName)
    }

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
    wx.showLoading({ title: '加载中...', })
    util.getLocation((successRes, failRes) => {
      wx.hideLoading()
      console.log(successRes)
      console.log(failRes)
      // var location = locationManager.gcj02tobd09(successRes.longitude, successRes.latitude)
      // this.loadCity(location[0], location[1])

      var location = locationManager.wgs2bd(successRes.longitude, successRes.latitude)
      longt = location[0];
      lati = location[1];
      this.loadCity(location[0], location[1])

      // this.loadCity(successRes.longitude, successRes.latitude)
    })

  },

  // processCouponCategoryData: function (successRes, failRes) {
  //   console.log(successRes)
  //   console.log(failRes)
  // },

  /** 获取定位城市 */
  loadCity: function (longitude, latitude) {
    var that = this

    wx.showLoading({ title: '加载中...', })

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

        /** 首次定位成功 -> 网络请求 */

        /** 请求分类类型 */
        that.requestCouponCategory(that.data.localCtiyName)


      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
        wx.hideLoading()
      }
    })
  },

  /** 请求分类 */
  requestCouponCategory: function (cityName) {

    var that = this;
    let url = config.couponCategoryUrl

    var para = {
      "city": cityName,
      "country": null
    }

    wx.showLoading({ title: '加载中...' })

    util.RequestManager(url, para, function (res, fail) {

      wx.hideLoading()

      var dic = new Array()

      var index = 0;

      for (var i = 0; i < res.data.length; i++) {
        let model = res.data[i];
        let array = model["nextCate"];
        for (var j = 0; j < array.length; j++) {
          let model_j = array[j];
          var temp = {};
          temp["id"] = index;
          temp["CategoryName"] = model["cateName"];
          temp["count"] = model_j["count"];
          temp["cateName"] = model_j["cateName"];
          dic.push(temp);

          //初始化每个页面的pageNO
          pageNo[index] = 1;

          index++;
        }
      }

      that.setData({ couponCategoryList: dic })

      if (that.data.currentTabIndex == 0) {
        /** 选中的分类名字 */
        selectedCategoryName = that.data.couponCategoryList[0]["CategoryName"];
        /** 选中的具体类型名字 */
        selectedfcName = that.data.couponCategoryList[0]["cateName"];

        /** 网络请求: 按条件搜索 */
        that.loadNewData(selectedCategoryName, selectedfcName, that.data.localCtiyName)

      }

      // console.log(that.data.couponCategoryList)

    })
  },

  /** 下拉刷新 */
  loadNewData: function (doorCateName, fcName, cityName) {

    pageNo[this.data.currentTabIndex] = 1;

    this.requestCouponSearchList(this.data.currentTabIndex, doorCateName, fcName, cityName)

  },

  /** 上拉加载 */
  loadNewData_NextPage: function (doorCateName, fcName, cityName) {

    pageNo[this.data.currentTabIndex] += 1;

    this.requestCouponSearchList(this.data.currentTabIndex, doorCateName, fcName, cityName);
  },


  /** 好优惠搜索 */
  requestCouponSearchList: function (tabIndex, doorCateName, fcName, cityName) {

    var that = this

    wx.showLoading({ title: '加载中...', })

    var distanceStr = null

    if (that.data.quanchengSelectedName === "1千米") {
      distanceStr = "1000"
    } else if (that.data.quanchengSelectedName === "3千米") {
      distanceStr = "3000"
    }
    else if (that.data.quanchengSelectedName === "5千米") {
      distanceStr = "5000"
    } else if (that.data.quanchengSelectedName === "10千米") {
      distanceStr = "10000"
    } else if (that.data.quanchengSelectedName === "全城") {
      distanceStr = null
    }


    wx.request({
      url: config.CouponSearchListUrl,
      data: {
        "pageNum": pageNo[tabIndex].toString(),
        "pageSize": 20,
        "doorCateName": doorCateName,
        "fcName": fcName,
        "position": {
          "distance": distanceStr,
          "latitude": lati,
          "longitude": longt
        },
        "sortType": ("离我最近" === that.data.priceSelectedName ? 0 : 1), //排序方式 0- 距离排序 1-面额最高排序
        "city": cityName,
        "country": null
      },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: '',
      success: function (res) {

        if (pageNo[tabIndex] == 1) {
          //下拉刷新
          dic[tabIndex] = res.data.data.dataList;
          that.setData({ couponSearchList: dic })

        } else {
          //上拉加载
          dic[tabIndex] = dic[tabIndex].concat(res.data.data.dataList)
          that.setData({ couponSearchList: dic })
        }

        console.log(that.data.couponSearchList)

      },
      fail: function (res) { },
      complete: function (res) { wx.hideLoading() },

    })

  },

  /** 领取优惠券 */
  tapAddCoupon: function (e) {

    console.log(e)

    let couponId = e.currentTarget.dataset.couponid
    let url = config.addCouponUrl

    var userId = "";
    wx.getStorage({
      key: 'userId',
      success: function (res) {

        userId = res.data;

        console.log(res.data)

        if (userId.length > 0) {

          //登录有效
          var para = {
            "userId": userId,
            "couponId": couponId
          }

          wx.showLoading({ title: '加载中...' })

          util.RequestManager(url, para, function (res, fail) {

            wx.hideLoading()

            if (res["code"] == "000000") {

              wx.showToast({
                title: '领取成功',
                icon: 'success',
                duration: 3000
              })
            } else if (res["code"] == "000001") {

              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else {
              wx.showToast({
                title: res["mesg"],
                icon: 'warn',
                duration: 3000
              })
            }

          })

        } else {
          //登录无效 - 跳转到登录界面
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
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
    //下拉刷新
    this.loadNewData(selectedCategoryName, selectedfcName, this.data.localCtiyName)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉加载
    this.loadNewData_NextPage(selectedCategoryName, selectedfcName, this.data.localCtiyName)
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

    /** 下拉刷新 - 网络请求: 按条件搜索 */
    this.loadNewData(selectedCategoryName, selectedfcName, this.data.localCtiyName)

  },
  tapQuanchengCell: function (e) {
    this.listquancheng("") /** 点击收起下拉菜单 */
    let index = e.currentTarget.dataset.index
    this.setData({ quanchengSelectedName: this.data.quancheng[index] })
    console.log(this.data.quanchengSelectedName)

    /** 下拉刷新 - 网络请求: 按条件搜索 */
    this.loadNewData(selectedCategoryName, selectedfcName, this.data.localCtiyName)
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