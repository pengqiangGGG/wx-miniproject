
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
import Toast from '../../lib/toast/toast';
const WXAPI = require('../../wxapi/main.js')
var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },

  wxLogin: function (e) {
    //console.log(e)
    wx.showLoading();
    var that = this;
    var token = app.globalData.token
    if (token) {
      WXAPI.checkToken(token).then(res=>{
        if (res.code != 0) { //token过期清除token重新登录
            app.globalData.token = null
            that.wxLogin();
        }
      })
      return;
    }
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://api.it120.cc/zhanglangeba/user/wxapp/login',
          data: {
            code: res.code
          },
          success: function (res) {
            if (res.data.code == 10000) {//代表没有注册
              // 先用code去注册，注册成功之后再来用code登录获取token
              that.registerUser();
              return;
            }
            if (res.data.code != 0) {
              // 登录错误
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
              return;
            }
            //console.log(res.data.data)
           app.globalData.token = res.data.data.token;
            // that.globalData.uid = res.data.data.uid;
            wx.setStorageSync('token', res.data.data.token)
            //wx.setStorageSync('uid', res.data.data.uid)
            WXAPI.userDetail(res.data.data.token).then(res => {
                //console.log(res)
              if(res.code == 0){
                app.globalData.userInfo = res.data.base
                wx.setStorageSync('userInfo', res.data.base)
                wx.navigateBack({
                  delta: 1
                })
              }
            })
            
          }
        })
      }
    })
    wx.hideLoading();
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: 'https://api.it120.cc/zhanglangeba/user/wxapp/register/complex',
              data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
              success: (res) => {
                //注册成功返回登录
                wx.hideLoading();
                that.wxLogin();
              }
            })
          }
        })
      }
    })
  },
})