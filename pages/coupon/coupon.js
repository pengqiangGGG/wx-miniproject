// pages/coupon/coupon.js
//         15807139623
const WXAPI = require('../../wxapi/main.js')
import Toast from '../../lib/toast/toast.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      code:''
  },
  changeCode(value){
    this.setData({
      code: value.detail
    })
  },
  convert(){
      // console.log(value)
      var data = {
        pwd:this.data.code,
        token:app.globalData.token
      }
    WXAPI.fetchCoupons(data).then(res=>{
      // console.log(res)
      if(res.code == 0){
        Toast.success('领取成功！可在我的优惠券中查看')
      }else{
        Toast.fail(res.msg)
      }
    })
  },
  getCoupon(value){
      var id = value.currentTarget.dataset.id
      var data = {
        id:id,
        token:app.globalData.token
      }
      WXAPI.fetchCoupons(data).then(res => {
        // console.log(res)
        if (res.code == 0) {
          Toast.success('领取成功！可在我的优惠券中查看')
        } else {
          Toast.fail(res.msg)
        }
      })
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
    var data = {
      token:app.globalData.token
    }
    var that = this
    WXAPI.coupons(data).then(res=>{
      // console.log(res.data)
        if(res.code == 0){
          that.setData({
            list:res.data
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