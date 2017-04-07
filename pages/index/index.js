//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },


  formSubmit: function(e) {
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  if (e.detail.value.mobile.length == 0) {

    wx.showToast({

      title: '手机号码不得为空!',

      icon: 'loading',

      duration: 1000

    })

    setTimeout(function () {

      wx.hideToast()

    }, 1000)

  } else if (e.detail.value.mobile.length != 11) {
    console.log(e.detail.value.mobile);
    wx.showToast({

      title: '请输入11位手机号码!',

      icon: 'loading',

      duration: 1000

    })

    setTimeout(function () {

      wx.hideToast()

    }, 1000)

  } else if(!myreg.test(e.detail.value.mobile)){
      wx.showToast({
            title: '手机号有误！',
            icon: 'loading',
            duration: 1000
      })
       setTimeout(function () {
          wx.hideToast()
        }, 1000)

  }else {

    wx.request({

      url: 'https://www.rxlwzh.com/index.php/home/index/index',

      header: {

        "Content-Type": "application/x-www-form-urlencoded"

      },

      method: "POST",

      data: { mobile: e.detail.value.mobile},

      success: function (res) {
        console.log(res);
        console.log(res.data);

        if (res.data == 0) {

          wx.showToast({
            title: '信息填写成功',
            icon: 'loading',
            duration: 1000
         })

        } else {

          wx.showToast({

            title: res.data,//这里打印出登录成功

            icon: 'success',

            duration: 1000

          })

        }

      }

    })

  }

} 
})
