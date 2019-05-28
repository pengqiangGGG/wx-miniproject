// pages/catelog/catelog.js
var API = require('../../utils/api.js')
const WXAPI = require('../../wxapi/main.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      activeId:0,
      //navlist:[]
    goodsCategoryId:0,//要显示的商品的类目id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = parseInt(options.id)
    var index = parseInt(options.index)
    var selfId = parseInt(options.selfId)
    //console.log(options.selfId)

    //设置页面跳转过来的tab
    WXAPI.goodsCategory().then(res=>{
      var list = res.data.filter(function(item){
        return item.pid == id
      })
      that.setData({
        topNavList:list,//当前显示的tab数组
        activeId: index,
        goodsCategoryId: selfId
      })
    })
    //设置页面跳转过来对应tab显示的商品
    WXAPI.goods().then(res=>{
      //console.log(res)
      var goodList = res.data.filter(function (item){
        return item.categoryId == selfId
      })
      that.setData({
        showList: goodList,//要显示的商品
        allGoods: res.data//所有商品
      })
    })
  },

//切换tabs
  changeTab(index){
    var that = this
    var index = index.detail.index//当前切换的tab的下标
    var goodsCategoryId = that.data.topNavList[index].id
    var goodList = that.data.allGoods.filter(function(item){
      return item.categoryId == goodsCategoryId
    })
    that.setData({
      showList: goodList,//要显示的商品
    })
    

  },
  //跳转到详情
  goGoodsInfo(e){
    var id = e.currentTarget.dataset['postid']
    wx.navigateTo({
      url: '../good-info/good-info?id=' + id 
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