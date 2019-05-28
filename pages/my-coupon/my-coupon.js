// pages/my-coupon/my-coupon.js
const app = getApp()
const WXAPI = require('../../wxapi/main.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    canUse:[],// 0
    noUse:[],//1 , 2
    hasUse:[]//3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    var data = {
      token:app.globalData.token
    }
    WXAPI.myCoupons(data).then(res=>{
        if(res.code == 0){
          // console.log(res.data)
          var canUse = res.data.filter(item=>{
            return item.status == 0
          })
          var noUse = res.data.filter(item => {
            return item.status == 1 || item.status == 2
          })
          var hasUse = res.data.filter(item => {
            return item.status == 3
          })
          that.setData({
            canUse: canUse,
            noUse:noUse,
            hasUse:hasUse
          })
        }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})