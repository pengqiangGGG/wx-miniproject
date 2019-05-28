// pages/detail-order/detail-order.js
const WXAPI = require('../../wxapi/main.js')
import Toast from '../../lib/toast/toast.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goods:[],
      logs:[],
      orderInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      var id = options.id
      var token = app.globalData.token
      if(id){
        WXAPI.orderDetail(id,token).then(res=>{
          // console.log(res)
          if(res.code == 0){
              that.setData({
                goods:res.data.goods,
                logs:res.data.logs,
                orderInfo:res.data.orderInfo
              })              
          }else{
            Toast.fail('获取订单详情失败！')
          }
        }) 
      }
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