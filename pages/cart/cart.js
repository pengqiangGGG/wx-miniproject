// pages/cart/cart.js
const WXAPI = require('../../wxapi/main.js')
import Toast from '../../lib/toast/toast'; 
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: wx.getStorageSync('cartList') ? wx.getStorageSync('cartList') : [],
    isAll:true,
    allPrice:0,
    allNum:0,
    isEdit:true,
    isNotAll:false,
  },
  // openSetting(){
  openSetting(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储的购物车列表
   //wx.removeStorageSync('cartList')
    var that = this 
    if (!app.globalData.token){
        that.setData({
          list: [],
          isLogin:false
        })
          
    }else{
      var token = app.globalData.token
        WXAPI.checkToken(token).then(res=>{
          //console.log(res)
            if(res.code != 0){
              that.setData({
                list: [],
                isLogin: false
              })
              return false;
            }else{
              var list = wx.getStorageSync('cartList') ? wx.getStorageSync('cartList') : []
              if (list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                  if (list[i].isChoosed == false) {
                    list[i].isChoosed = true
                  }
                }
                that.setData({
                  list: list,
                })
                that.totalPrice()
              }else{
                that.setData({
                  list: [],
                  isLogin: true
                })
              }
            }
        })
    }
    
  },
  //计算总价总量
  totalPrice(){
    var that = this 
    var allPrice = 0
    var allNum = 0
    that.data.list.forEach(function (item) {
      if (item.isChoosed) {
        allPrice += item.number * item.price,
          allNum += item.number
      }
    })
    that.setData({
      allPrice: allPrice,
      allNum: allNum
    })
  },
  //点击选中
  isChecked(event){
    //console.log(event.currentTarget.dataset.index)
    var index = event.currentTarget.dataset.index
    var list = this.data.list
    if(list[index].isChoosed){
      list[index].isChoosed = false
    }else{
      list[index].isChoosed = true
    }
    this.setData({
      list:list
    })
    this.isAllChoosed()
    this.isNotChoosed()
    this.totalPrice()
  },
  //判断是否有没选中的
  isAllChoosed(){
    var isNo = this.data.list.find(function(item){
      return item.isChoosed == false
    })
    if (isNo){
        this.setData({
          isAll:false
        })
    }else{
      this.setData({
        isAll: true
      })
    }
  },
  go_login(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  goSee() {
    wx.switchTab({
      url: '../category/category'
    })
  },
  //判断是否有选中的
  isNotChoosed() {
    var isNo = this.data.list.find(function (item) {
      return item.isChoosed == true
    })
    if (isNo) {
      this.setData({
        isNotAll: true
      })
    } else {
      this.setData({
        isNotAll: false
      })
    }
  },
  //数量加减
  onChange(event){
      //console.log(event)
    var index = event.currentTarget.dataset.index
    var list = this.data.list
    list[index].number = event.detail
    this.setData({
      list: list
    })
    this.totalPrice()
  },
  //点击全选
  chooseAll(){
    if (this.data.isAll){
      var list = this.data.list
      for(let i = 0;i<list.length;i++){
          if(list[i].isChoosed == true){
            list[i].isChoosed = false
          }
      }
      this.setData({
        isAll:false,
        list: list
      })
    }else{
      var list = this.data.list
      for (let i = 0; i < list.length; i++) {
        if (list[i].isChoosed == false) {
          list[i].isChoosed = true
        }
      }
      this.setData({
        isAll: true,
        list: list
      })
    }
    this.totalPrice()
  },
  //点击编辑
  cartEdit(){
    var list = this.data.list
    for (let i = 0; i < list.length; i++) {
      if (list[i].isChoosed == true) {
        list[i].isChoosed = false
      }
    }
    this.setData({
      isEdit:false,
      isAll: false,
      list: list
    })
  },
  //点击完成
  hasEdit(){
    var list = this.data.list
    for (let i = 0; i < list.length; i++) {
      if (list[i].isChoosed == false) {
        list[i].isChoosed = true
      }
    }
    this.setData({
      isEdit: true,
      isAll: true,
      list: list,
      isNotAll:false
    })
    this.totalPrice()
  },
  //点击删除
  delCart(){
    var list = this.data.list
    for(let i = 0;i<list.length;i++){
        if(list[i].isChoosed){
            list.splice(i,1)
            i--
        }
    }
    wx.setStorageSync('cartList', list)
    this.setData({
      list:list
    })
  },
  //点击去下单
  go_order(){
    var that = this
    var list = this.data.list
    var data = {
      goodsJsonStr:[],//下单的商品数组
      address:'' //下单地址
    }
    for (let i = 0; i < list.length;i++){
      if (list[i].isChoosed == true){
        data.goodsJsonStr.push(list[i])//获取要下单的商品
       
      }
    }
    if (data.goodsJsonStr.length<=0){
      Toast.fail("请选择商品！")
    }else{
      wx.navigateTo({
        url: '../order/order?orderList=' + escape(JSON.stringify(data))  //跳转到下单页面
      })
    }
    // WXAPI.orderCreate(data).then(res=>{
    //   //console.log(res)
    //   //返回token无效 什么鬼，看文档不要token的，这里暂且当下单成功
    //   if(res.code == 2000){
    //     wx.setStorageSync('cartList', list)//重新设置购物车数组
    //     wx.setStorageSync('orderList', data)//存贮下单成功的商品数组
    //     wx.navigateTo({
    //       url: '../order/order'  //跳转到下单成功页面
    //     })
    //     // that.setData({
    //     //   list: list
    //     // })
    //   }
    // })
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
    this.onLoad()
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