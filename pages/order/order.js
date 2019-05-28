// pages/order/order.js
const WXAPI = require('../../wxapi/main.js')
import Toast from '../../lib/toast/toast.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"",
    address:{},
    showAdd:true,
    orderObj:{},
    list:[],
    localList:'',
    allPrice:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(JSON.parse(unescape(options.orderList)))
    var that = this
    var orderGoods = JSON.parse(unescape(options.orderList)) //要下单的商品对象
    that.setData({
      list: orderGoods.goodsJsonStr, //下单的商品数组
      orderObj: orderGoods,
      localList:wx.getStorageSync('cartList').length
    })
    this.getAllPrice()
  },
  getMssage(value){
    //console.log(value.detail)
    this.setData({
      message: value.detail
    })
  },
  goAddress(){ //新增地址页面
      wx.navigateTo({
        url: '../address/address',
      })
  },
  //选择地址页面
  chooseAddress(){
    wx.navigateTo({
      url: '../list-address/list-address',
    })
  },
  //获得总价格
  getAllPrice(){
    var price = 0
    this.data.list.forEach(function(item){
        price += item.number*item.price 
    })
    this.setData({
      allPrice:price
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
    if(this.data.localList != wx.getStorageSync('cartList').length){
      wx.navigateBack({
        delta: 1
      })
    }
    //获取默认的收货地址
    var that = this
    var token = app.globalData.token
    WXAPI.defaultAddress(token).then(res => {
      //console.log(res.data)
      if (res.code == 0) {
        that.setData({
          address: res.data,
          showAdd: false
        })
      } else {
        that.setData({
          showAdd: true
        })
      }
    })
    that.setData({
      couponPrice: app.globalData.couponPrice,
      couponId: app.globalData.couponId
    })
  },
  //提交订单
  submit(){
    var arr = []
    for(let i = 0;i<this.data.list.length;i++){
      var obj = {}
      for (let j in this.data.list[i]){
        obj[j] = this.data.list[i][j]
      }
      arr.push(obj)
    }
    //console.log(JSON.stringify(arr))
    var data = this.data.orderObj
    data.goodsJsonStr = JSON.stringify(arr)
    data.address = this.data.address.address
    data.cityId = this.data.address.cityId
    data.code = this.data.address.code
    data.couponId = this.data.couponId//优惠券编号
    data.districtId = this.data.address.districtId
    data.expireMinutes = '0' //多少分钟未支付自动关闭本订单，传0不自动关闭订单
    data.calculate = false //true 不实际下单，而是返回价格计算
    data.idcard = '' //身份证号码【国际件使用】
    data.kjid = ''//砍价编号，可直接购买砍价商品
    data.linkMan = this.data.address.linkMan
    data.mobile = this.data.address.mobile
    data.payOnDelivery = 2  // 1 为货到付款，其他数字为先支付
    data.peisongType = "kd"  //配送类型，kd 代表快递；zq代表到店自取
    data.pingtuanOpenId = ""   //拼团购买的团号
    data.provinceId = this.data.address.provinceId
    data.remark = this.data.message //下单备注
    data.token = app.globalData.token
    //  /console.log(data)
    WXAPI.orderCreate(data).then(res=>{
      // console.log(res)
      if(res.code == 0){
        Toast.success("下单成功！")
        //删除购物车里面的此商品
        var delList = this.data.list //要删除的商品数组
        var cartList = wx.getStorageSync("cartList") //购物车的商品数组
        for(let i = 0;i<cartList.length;i++){
            for(let j = 0;j<delList.length;j++){
              if (cartList[i].goodsId == delList[j].goodsId && cartList[i].propertyChildIds == delList[j].propertyChildIds){
                  cartList.splice(i,1)
                
                  wx.setStorageSync("cartList", cartList)
                }
            }
        }
        setTimeout(function(){
          wx.navigateTo({
            url: '../list-order/list-order',
          })
        },1000)
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