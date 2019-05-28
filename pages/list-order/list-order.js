// pages/list-order/list-order.js
const WXAPI = require('../../wxapi/main.js')
const app = getApp()
import Toast from '../../lib/toast/toast.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      active:0,
      orderList:[],
      goodsList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    if(id){
      this.setData({
        active:id
      })
    } 
  },
  getList(){
    var that = this
    const data = {
      token: app.globalData.token
    }
    WXAPI.orderList(data).then(res => {
       //console.log(res)
      if (res.code == 0) {
        that.setData({
          orderList: res.data.orderList,
          goodsList: res.data.goodsMap
        })
      }
    })
  },
  cancel(e){
    // console.log(e)
    var that = this
    var id = e.currentTarget.dataset.id
    var token = app.globalData.token
    WXAPI.orderClose(id,token).then(res=>{
      if(res.code == 0){
        that.getList()
        Toast.success("取消订单成功！")
      }else{
        Toast.success("取消订单失败！")
      }
    })
  },
  payMoney(e){
    var that = this
    // var price = e.currentTarget.dataset.price
    // var token = app.globalData.token
    var data = {
      money: e.currentTarget.dataset.price,
      token: app.globalData.token
    }
    WXAPI.wxpay(data).then(res=>{
      // console.log(res)
      Toast.fail(res.msg)
    })
  },
  goSee(){
    wx.switchTab({
      url: '../category/category'
    })
  },
  goDetail(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail-order/detail-order?id='+id,
    })
  },
  goRating(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../rating/rating?id=' + id,
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
    this.getList()  
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