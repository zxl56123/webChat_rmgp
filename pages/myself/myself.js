// pages/me/me.js
var app = getApp()

Page({
  data:{
    motto: '世界上唯一不变的，就是一切都在变',
    userInfo: {}
    },
    //事件处理函数
    bindViewTap:function(){
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
       var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})