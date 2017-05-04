/**
 * 小程序配置文件
 */

var host = "http://gov.jointem.com/zyb/api"  //API请求接口
var host_iamge = "http://gov.jointem.com"     //图片拼接前

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 获取新闻动态
    GET_HOT_NEWS: `${host}/hotNews/public/getHotNews?accessToken=`,

    // 测试的请求地址
    requestUrl: `${host}/testRequest`,

};

module.exports = config
