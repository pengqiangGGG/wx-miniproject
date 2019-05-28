// pages/mine/mine.js
var app = getApp()
import Toast from '../../lib/toast/toast.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
   
  },
  goSigned(){
    wx.navigateTo({
      url: '../signed/signed',
    })
  },
  goFeed(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  go_order(){
    wx.navigateTo({
      url: '../list-order/list-order',
    })
  },
  goCoupon(){
    wx.navigateTo({
      url: '../my-coupon/my-coupon',
    })
  },
  waitPay(){
    wx.navigateTo({
      url: '../list-order/list-order',
    })
  },
  waitSend(){
    wx.navigateTo({
      url: '../list-order/list-order?id=1',
    })
  },
  waitGet(){
    wx.navigateTo({
      url: '../list-order/list-order?id=2',
    })
  },
  waitRate(){
    wx.navigateTo({
      url: '../list-order/list-order?id=3',
    })
  },
  goCollect(){
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  goAbout(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  //联系客服
  contact(){
    wx.makePhoneCall({
      phoneNumber: '027-1008600110',
    })
    // this.setData({
    //   show:true
    // })
  },
  setAddress(){
    wx.navigateTo({
      url: '../list-address/list-address',
    })
  },
  // getPhoneNumber(e){
  //     console.log(e)
  // },
  bindUserPhone(){
    Toast.fail("该 appid 没有权限!需注册认证过的小程序")
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
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
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