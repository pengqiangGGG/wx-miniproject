// pages/list-address/list-address.js
const WXAPI = require('../../wxapi/main.js')
import Toast from '../../lib/toast/toast.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
  goAddress(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  editAddress(e){
    //console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../address/address?id='+ id,
    })
  },
  chooseAddress(e){
    if(this.data.list.length == 1){
        wx.navigateBack({
          delta:1
        })
        return
    }else{
        var data = e.currentTarget.dataset.address
        data.isDefault = true
        data.token = app.globalData.token
        //console.log(data)
        WXAPI.updateAddress(data).then(res=>{
          // console.log(res)
          if(res.code == 0){
            Toast("地址切换成功!")
            this.getList()
          }
        })
    }  
  },
  //获得默认地址
  getList(){
    var that = this
    var token = app.globalData.token
    WXAPI.queryAddress(token).then(res => {
      //console.log(res)
      if (res.code == 0) {
        if (res.data.length == 1) {
          res.data[0].isDefault = true
          that.setData({
            list: res.data,
          })
        } else {
          var isDefaultAddress = res.data.find(function (item) {
            return item.isDefault == true
          })
          if (!isDefaultAddress) {
            res.data[0].isDefault = true
            that.setData({
              list: res.data,
            })
          } else {
            that.setData({
              list: res.data,
            })
          }
        }

      } else {
        Toast("暂无收货地址！")
        that.setData({
          list: []
        })
      }
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