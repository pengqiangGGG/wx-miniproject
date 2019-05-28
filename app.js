
var util = require('./utils/util.js');
var user = require('./utils/user.js');
const WXAPI = require('./wxapi/main.js')
App({
  onLaunch: function () {
    // wx.removeStorageSync('userInfo')
    // wx.removeStorageSync('token')
    // wx.removeStorageSync('uid')
    const updateManager = wx.getUpdateManager();
    wx.getUpdateManager().onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    
  },
  
  globalData: {
    token:wx.getStorageSync('token'),
    userInfo: wx.getStorageSync('userInfo'),
    couponPrice:0,//优惠金额
    couponId:0
  }
})