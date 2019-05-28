// pages/choose-coupon/choose-coupon.js
const WXAPI = require('../../wxapi/main.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      allPrice:0,
      couponId: 0
  },
  noChoose(){  //不使用优惠
      app.globalData.couponPrice = 0
      app.globalData.couponId = 0
      wx.navigateBack({
        deale:1
      })
  },
  chooseUse(e){
    // console.log(e)
      app.globalData.couponPrice = e.currentTarget.dataset.couponprice,
      app.globalData.couponId = e.currentTarget.dataset.couponid
    this.setData({
      couponId: e.currentTarget.dataset.couponid
    })
    wx.navigateBack({
      deale: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //console.log(options.allPrice)
      this.setData({
        allPrice: options.allPrice
      })
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
      // console.log(res.data)
        if(res.code == 0){
          that.setData({
              list:res.data
          })
        }
    })
    that.setData({
      couponId: app.globalData.couponId
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