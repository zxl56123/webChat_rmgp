/**
 * 小程序配置文件
 */

var host = "http://gov.jointem.com/zyb/api"  //API请求接口
var host_sh = "http://m.jointem.com"  //API请求接口
var host_iamge = "http://gov.jointem.com"     //图片拼接前

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    loginUrl: `${host_iamge}/zyb/public/user/system/login`, /** 登录接口 login */
    
    GET_HOT_NEWS: `${host}/hotNews/public/getHotNews?accessToken=`,/** 获取新闻动态 */
    
    newsTagUrl: `${host}/newstag/public/getnewstag`, /** 获取政务资讯顶部标签 */

    // 测试的请求地址
    requestUrl: `${host}/testRequest`,

    //生活
    
    ttPrizeUrl: `${host_sh}/front/public/activity/getActivityListByTypeId`,/** 天天有奖 */
    onePrizeUrl: `${host_sh}/front/public/oyb/getServantPrdList`, /** 一元夺宝 */
    miaoshaUrl: `${host_sh}/front/public/activity/getActivityListByTypeId`, /** 一元夺宝 */
    couponCategoryUrl: `${host_sh}/front/public/search/getCouponCategory`, /** 获取优惠券分类 */
    CouponSearchListUrl: `${host_sh}/front/public/search/getCouponSearchList`, /*好优惠搜索*/
    addCouponUrl: `${host_sh}/front/public/user/url/addCoupon`, /** 领取优惠券 */
};

module.exports = config
