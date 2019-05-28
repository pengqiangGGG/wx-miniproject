// pages/collect/collect.js
const WXAPI = require('../../wxapi/main.js')
const app = getApp()
import Notify from '../../lib/notify/notify.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList(){
    var that = this
    var token = app.globalData.token
    WXAPI.collectList(token).then(res => {
      if (res.code == 0) {
        // console.log(res)
        that.setData({
          list: res.data
        })
      }else{
        that.setData({
          list: []
        })
      }
    })
  },
  onClose(event) {
    var that = this
    var token = app.globalData.token
    var goodsId = event.currentTarget.dataset.id
    if(event.detail == "right"){
      WXAPI.deleteCollect(goodsId, token).then(res => {
        if (res.code == 0) {
          Notify({
            text: '删除成功',
            duration: 800,
          })
          that.getList()
        }
      })
    }else{
      wx.navigateTo({
        url: '../good-info/good-info?id=' + goodsId,
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