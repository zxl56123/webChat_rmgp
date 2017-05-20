// pages/bianmin/bianmin.js

const config = require('../../config')
var pageNo = 0;
Page({
  data: {
    currentTabIndex: 1,
    list: [],
    newsTagList: []
  },
  clickOrderTab: function (e) {
    //data = {};
    
    var dataset = e.target.dataset
    
    this.setData({ currentTabIndex: dataset.index })

    // data['pages'] = 1;
    // data['orderLists'] = [];
    // data['noMore'] = false;
    // if (dataset.goodsType) {
    //   data.currentGoodsType = dataset.goodsType;
    // }

    // this.setData(data);
    // this.getOrderList({ tabIndex: index });
  },
  /** 跳转要闻详情页面 */
  tapHotNewsCell: function (event) {
    wx.navigateTo({
      url: '../index/HotNewsDetail/HotNewsDetail'
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    
    //this.setData({ newsTagList : ["本地新闻","工作动态","信息公开","互动交流","招标公告"]})
    this.requestNewsTagData();

    this.loadNewData();

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    console.log("页面显示")

    // wx.showToast({
    //   title: '成功123',
    //   icon: 'success',
    //   duration: 1500
    // })
  },

  /** 下拉刷新 */
  loadNewData: function () {
    pageNo = 1;
    this.requestData()

  },

  loadNewData_NextPage: function () {
    pageNo += 1;
    this.requestData();
  },
  requestNewsTagData:function () {
    var that = this
    var tempNewsTagList = new Array();
    wx.request({
      url: config.newsTagUrl + "?accessToken=",
      data: {
        "system": "02",
        "imei": "A902EA47-B1B2-452A-96FB-4C7BCCBB149C",
        "currentVersion": "3.1.6",
        "model": "iPhone 6s Plus (A1699)",
        "accessToken": "",
        "systemVersion": "10.3.2",
        "sig": ""
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        // success
        tempNewsTagList = res.data.data.showTagList;
        tempNewsTagList = tempNewsTagList.concat(res.data.data.notShowTagList);

        that.setData({ newsTagList: tempNewsTagList })
        console.log(that.data.newsTagList)
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        
      }
    })


  },

  requestData: function () {
    var that = this

    wx.request({
      url: config.GET_HOT_NEWS + "?accessToken=",
      data: {
        "system": "02",
        "tagId": "1",
        "accessToken": "",
        "scopeAddressCode": "5304",
        "key": "",
        "systemVersion": "10.1.1",
        "imei": "C75C7019-29FA-4F2B-8311-BAA6F29D1845",
        "currentVersion": "3.1.6",
        "sig": "",
        "pageNo": "1",
        "model": "iPhone 5s (A1457\/A1518\/A1528\/A1530)",
        "pageSize": "20"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        // success
        if (pageNo == 1) {
          that.setData({ list: res.data.data.list })

        } else {
          that.setData({ list: that.data.list.concat(res.data.data.list) })

        }

        console.log(that.data.list)

      },
      fail: function (res) {
        // fail
        pageNo--;
      },
      complete: function (res) {
        // complete
        wx.stopPullDownRefresh()
      }
    })

  },

  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    this.loadNewData();

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log("onReachBottom")

    this.loadNewData_NextPage()
  }

})