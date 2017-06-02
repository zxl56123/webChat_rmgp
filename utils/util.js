function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 定位 */
function getLocation(successRes, failRes) {
  var that = this
  wx.getLocation({
    type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
    success: function (res) {
      // success  
      // let longitude = res.longitude
      // let latitude = res.latitude
      // that.loadCity(longitude, latitude)
      successRes(res)

    },
    fail: function (error) {
      // fail  
      failRes(error)
    },
    complete: function () {
      // complete  
    }
  })
}

/** 网络请求-POST */
function RequestManager(url, para, successRes, failRes) {
  wx.request({
    url: url,
    data: para,
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    dataType: '',
    success: function (res) {

      if (res.data["code"] == "000000") {
        successRes(res.data);
      } else {
        //failRes("error" + res.data["code"])
        //failRes(res.data);
        successRes(res.data);
      }

      console.log(url + "      ***********->      " + res.data["mesg"])
    },
    fail: function (error) {
      failRes(error)
      console.log(url + "      ***********->      " + error)
    }
  })
}

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function convertToDistance(dis) {
  var tempDis = parseFloat(dis)

  if (tempDis < 1000) {
    return tempDis.toFixed(0) + "m"

  } else {
    return (tempDis / 1000).toFixed(1) + "km"
  }

}

module.exports = {
  formatTime: formatTime,
  getLocation: getLocation,
  RequestManager: RequestManager,
  convertToStarsArray: convertToStarsArray,
  convertToDistance: convertToDistance
}
