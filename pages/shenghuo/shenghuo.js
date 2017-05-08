// pages/shenghuo/shenghuo.js

var WxParse = require('../../wxParse/wxParse.js');

var htmlContentStr = `
  <body class="grade-a platform-browser platform-macintel platform-ready platform-ios">
    <!--<ion-pane>
      <ion-header-bar class="bar-stable">
        <h1 class="title">Ionic Blank Starter</h1>
      </ion-header-bar>
      <ion-content>
      </ion-content>
    </ion-pane>-->
    <ion-nav-bar class="nav-bar-container hide" nav-bar-transition="none" nav-bar-direction="none" nav-swipe=""><div class="nav-bar-block" nav-bar="cached"><ion-header-bar align-title="center" class="bar bar-header"><div class="title title-center header-item"></div></ion-header-bar></div><div class="nav-bar-block" nav-bar="active"><ion-header-bar align-title="center" class="bar bar-header"><div class="title title-center header-item" style=""></div></ion-header-bar></div></ion-nav-bar>
  <ion-nav-view class="view-container" nav-view-transition="none" nav-view-direction="none" nav-swipe=""><ion-view hide-nav-bar="true" class="pane" state="index" nav-view="active" style="transition-duration: 0ms; transform: translate3d(0%, 0px, 0px); opacity: 1;">
  <!--搜索框-->
  <div class="newM-search-bg">
  </div>
  <div class="good-life-search-box" style="top: 8px;">
    <div class="good-life-search-city">
      <div class="city-location">
  <div class="city-location-tittle" ng-click="showList()">
    <span class="ng-binding">
      玉溪市
    </span>
    <i class="icon-acrow-down"></i>

  </div>
  
</div>
    </div>

    <div class="good-life-search-icon" ng-click="goToSearch()">
      <img src="img/search.png" class=" search-magnifier-icon">
      <p class="good-life-search-input">点击搜索</p>
    </div>
  </div>

<ion-content has-bouncing="hasDoRefresh" overflow-scroll="!hasDoRefresh" class="scroll-content ionic-scroll"><div class="scroll" style="transform: translate3d(0px, 0px, 0px) scale(1);">
  <!-- ngIf: hasDoRefresh -->

  <!--导航轮播-->
  <ion-slides search-background="" id="main_lunbo" class="topSlider ng-hide" ng-style="lunboImgStyle" options="options" slider="data.slider" ng-show="MainAdvertList.length>0" style="width: 1440px; height: 576px;"><div class="swiper-container swiper-container-horizontal"><div class="swiper-wrapper" ng-transclude="">
    <!-- ngRepeat: item in MainAdvertList -->
  </div><div ng-hide="!showPager" class="swiper-pagination swiper-pagination-clickable"></div></div></ion-slides>
  <!--没有轮播图时占位（搜索框的高度）-->
  <div style="width: 100%;height: 51px;background-color: #f5f5f9;" ng-show="!(MainAdvertList.length>0)"></div>
  <!--分类入口-->
  <div class="f-orally box newM-f-orally">
    <div class="fullLine width_25" ng-click="goToValuePreference()"><img src="img/quan.png"><div>领券中心</div></div>
    <div class="fullLine width_25" ng-click="goToGoodLife()"><img src="img/hai.png"><div>吃喝玩乐</div></div>
    <div class="fullLine width_25" ng-click="goToSelectedGoods()"><img src="img/mai.png"><div>精选商品</div></div>
    <div class="fullLine width_25" ng-click="goTolocalService()"><img src="img/bang.png"><div>分类服务</div></div>

  </div>
  <div class="blankDiv"></div>
   <!--活动入口-->
  <div class="newMact">
    <div class="newMact-item" ng-click="goTottPrize()">
       <div class="newMact-itemDiv"><img src="img/Nttyj.png"></div>
    </div><div class="newMact-item" ng-click="limitTimeEntry()">
        <div class="newMact-itemDiv"><img src="img/Nxsms.png"></div>
    </div><div class="newMact-item" ng-click="goToOneIndiana()">
        <div class="newMact-itemDiv"><img src="img/Nyydb.png"></div>
    </div>
  </div>
  <div class="newMact" style="border-top: solid #efefef 1px;">
    <div class="newMact-item" ng-click="goToGoldService()">
      <div class="newMact-itemDiv"><img src="img/Njpfw.png"></div>
    </div><div class="newMact-item" ng-click="goToDailySpecial()">
       <div class="newMact-itemDiv"><img src="img/jxsp.png"></div>
    </div><div class="newMact-item" ng-click="goToTideBrand()">
      <div class="newMact-itemDiv"><img src="img/Nhcqc.png"></div>
    </div>
  </div>

  <!--推荐列表-->
  <div class="newMact-Recommend">
    <div class="newMact-RecommendDiv"><img class="newMact-RecommendImg" src="img/tuij.png">&nbsp;--优选推荐--</div>
  </div>
  <div class="newMList">
    <!-- ngRepeat: item in RecommendList --><div class="newMList-item" ng-repeat="item in RecommendList" ng-click="goconveniencePrdDetailInfo(item)" style="">
      <div class="newMList-divImg" style="background-image: url('http://m.jointem.com/jintaiyang/img/20170214/1487061333070859.jpg')"></div>
      <div class="newMList-item-listright">
        <pre class="newMList-item-listRdiv1" parse-html="item.name">金太阳香辣蟹</pre>
        <!--<div class="newMList-item-listRdiv1">{{ item.name }}</div>-->
        <div class="star_bg">
          <!-- ngRepeat: innerItem in arr track by $index --><span class="star star_1" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_2" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_3" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_4" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_5" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_6" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_7" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_8" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_9" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_10 stars" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index -->
        </div>
        <span class="star-score ng-binding">5.0</span>
        <span class="ng-binding">云南省玉溪市红塔区</span><span class="newMList-itemsp-right ng-binding ng-hide" ng-hide="(item.distance == null) || (item.distance == 0) || (item.distance == '' || !isLocation)">5.0km</span>
        <div style="padding: 2px 0 0 0;font-size: 13px;" ng-hide="item.maxDiscountPrice<=0" class="">
          <span>今日最高优惠<strong class="newMList-strong ng-binding">¥ 30</strong>元</span>
        </div>
      </div>
    </div><!-- end ngRepeat: item in RecommendList --><div class="newMList-item" ng-repeat="item in RecommendList" ng-click="goconveniencePrdDetailInfo(item)">
      <div class="newMList-divImg" style="background-image: url('http://m.jointem.com/resource/mslogin/img/20170106/1483691233900514.jpg')"></div>
      <div class="newMList-item-listright">
        <pre class="newMList-item-listRdiv1" parse-html="item.name">玉溪盘子女人坊文化传播有限公司</pre>
        <!--<div class="newMList-item-listRdiv1">{{ item.name }}</div>-->
        <div class="star_bg">
          <!-- ngRepeat: innerItem in arr track by $index --><span class="star star_1" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_2" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_3" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_4" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_5" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_6" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_7" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_8" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_9" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_10 stars" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index -->
        </div>
        <span class="star-score ng-binding">5.0</span>
        <span class="ng-binding">云南省玉溪市红塔区</span><span class="newMList-itemsp-right ng-binding ng-hide" ng-hide="(item.distance == null) || (item.distance == 0) || (item.distance == '' || !isLocation)">101m</span>
        <div style="padding: 2px 0 0 0;font-size: 13px;" ng-hide="item.maxDiscountPrice<=0" class="">
          <span>今日最高优惠<strong class="newMList-strong ng-binding">¥ 2498</strong>元</span>
        </div>
      </div>
    </div><!-- end ngRepeat: item in RecommendList --><div class="newMList-item" ng-repeat="item in RecommendList" ng-click="goconveniencePrdDetailInfo(item)">
      <div class="newMList-divImg" style="background-image: url('http://m.jointem.com/lshgd/img/20170426/1493181936747010.jpg')"></div>
      <div class="newMList-item-listright">
        <pre class="newMList-item-listRdiv1" parse-html="item.name">大龙燊·旺角天空火锅馆</pre>
        <!--<div class="newMList-item-listRdiv1">{{ item.name }}</div>-->
        <div class="star_bg">
          <!-- ngRepeat: innerItem in arr track by $index --><span class="star star_1" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_2" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_3" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_4" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_5" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_6" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_7" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_8" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_9 stars" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_10" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index -->
        </div>
        <span class="star-score ng-binding">4.5</span>
        <span class="ng-binding">云南省玉溪市红塔区</span><span class="newMList-itemsp-right ng-binding ng-hide" ng-hide="(item.distance == null) || (item.distance == 0) || (item.distance == '' || !isLocation)">955m</span>
        <div style="padding: 2px 0 0 0;font-size: 13px;" ng-hide="item.maxDiscountPrice<=0" class="">
          <span>今日最高优惠<strong class="newMList-strong ng-binding">¥ 60</strong>元</span>
        </div>
      </div>
    </div><!-- end ngRepeat: item in RecommendList --><div class="newMList-item" ng-repeat="item in RecommendList" ng-click="goconveniencePrdDetailInfo(item)">
      <div class="newMList-divImg" style="background-image: url('http://m.jointem.com/lcmj/img/20161222/1482392664540667.jpg')"></div>
      <div class="newMList-item-listright">
        <pre class="newMList-item-listRdiv1" parse-html="item.name">玉溪良辰美酒商行</pre>
        <!--<div class="newMList-item-listRdiv1">{{ item.name }}</div>-->
        <div class="star_bg">
          <!-- ngRepeat: innerItem in arr track by $index --><span class="star star_1" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_2" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_3" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_4" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_5" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_6" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_7" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_8" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_9" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index --><span class="star star_10 stars" ng-repeat="innerItem in arr track by $index" ng-class="{&quot;stars&quot;:test(item.star,index)==$index}"></span><!-- end ngRepeat: innerItem in arr track by $index -->
        </div>
        <span class="star-score ng-binding">5.0</span>
        <span class="ng-binding">云南省玉溪市 红塔区</span><span class="newMList-itemsp-right ng-binding ng-hide" ng-hide="(item.distance == null) || (item.distance == 0) || (item.distance == '' || !isLocation)">1.0km</span>
        <div style="padding: 2px 0 0 0;font-size: 13px;" ng-hide="item.maxDiscountPrice<=0" class="">
          <span>今日最高优惠<strong class="newMList-strong ng-binding">¥ 50</strong>元</span>
        </div>
      </div>
    </div><!-- end ngRepeat: item in RecommendList -->
  </div>

</div><div class="scroll-bar scroll-bar-v"><div class="scroll-bar-indicator scroll-bar-fade-out" style="transform: translate3d(0px, 0px, 0px) scaleY(1); height: 226px;"></div></div></ion-content>
</ion-view></ion-nav-view>

  </div>`;
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    WxParse.wxParse('htmlContentStr', 'html', htmlContentStr, this, 5);

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