// pages/good-info/good-info.js

var app = getApp()
var API = require('../../utils/api.js')
const WXAPI = require('../../wxapi/main.js')
import Toast from '../../lib/toast/toast';
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:'',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    show_sku:false,
    commitList:[],
    goodsInfo:{},
    goods_num:1,
    price:0,
    oldprice:0,
    cart_num: wx.getStorageSync("cartList") ? wx.getStorageSync("cartList").length:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  previewImage(e){
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.goodsInfo.bannerImg // 需要预览的图片http链接列表  
    })
  },

  onLoad: function (options) {
    var that = this
    that.setData({
      cart_num: wx.getStorageSync("cartList") ? wx.getStorageSync("cartList").length : 0,
      goodsId: options.id,
    })
    WXAPI.goodsDetail(options.id).then(res=>{ 
      var article = res.data.content;
      /**
      * WxParse.wxParse(bindName , type, data, target,imagePadding)
      * 1.bindName绑定的数据名(必填)
      * 2.type可以为html或者md(必填)
      * 3.data为传入的具体数据(必填)
      * 4.target为Page对象,一般为this(必填)
      * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
      */
      WxParse.wxParse('article', 'html', article, that, 5);
      that.setData({
        goodsInfo: res.data,
        price: res.data.basicInfo.minPrice
      })
      
      console.log(that.data.goodsInfo)
    })
  },
  choose_sku(){
    this.setData({
      show_sku: true
    })
  },
  onClose() {
    this.setData({ show_sku: false });
  },
  //选择规格
  chooseValueOne(event){
    let that = this
    let chooseName = event.currentTarget.dataset.name//选择的规格名称
    let chooseValue = event.currentTarget.dataset.value//选择的规格值
    let id = event.currentTarget.dataset.id//选中的规格值的id
    let pid = event.currentTarget.dataset.pid//选中的规格名称的id
    let newGoodsInfo = this.data.goodsInfo
    for (let i = 0; i < newGoodsInfo.properties.length;i++){
      if (newGoodsInfo.properties[i].id == pid){
        for (let j = 0; j < newGoodsInfo.properties[i].childsCurGoods.length;j++){
          if (newGoodsInfo.properties[i].childsCurGoods[j].id == id){
              if (newGoodsInfo.properties[i].childsCurGoods[j].remark == 'false') {
                newGoodsInfo.properties[i].childsCurGoods[j].remark = 'true'
              } else {
                newGoodsInfo.properties[i].childsCurGoods[j].remark = 'false'
              }
            }else{
              newGoodsInfo.properties[i].childsCurGoods[j].remark = 'false'
            }
          }
        }
      }
      that.setData({
        goodsInfo: newGoodsInfo
      })
      that.getChooseSku()        
  },

  //选择数量
  onChange(e){  
    this.setData({
      goods_num: e.detail
    })
    //console.log(this.data.goods_num)
  },
  //收藏
  collect(){
    var that = this 
    var token = app.globalData.token
    var goodsId = that.data.goodsInfo.basicInfo.id
    if(token){
      WXAPI.checkCollect(goodsId,token).then(res=>{
          // console.log(res)
          if(res.code == 0){ //点击的时候商品已收藏的话就取消收藏
            WXAPI.deleteCollect(goodsId,token).then(res=>{
                if(res.code == 0){
                  Toast.success('取消收藏成功！')
                  that.setData({
                    collected:false
                  })
                }
            })
          }else{
            WXAPI.collect(goodsId, token).then(res => {
              // console.log(res)
              if (res.code == 0) {
                Toast.success('收藏成功！')
                that.setData({
                  collected: true
                })
              }
            })
          }
      }) 
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  //获取选中的规格
  getChooseSku(){
    var that = this
    var choosed_sku = []
    var sku_list = that.data.goodsInfo.properties
    for (let i = 0; i < sku_list.length;i++){
      var sku_one = {
        name: sku_list[i].name,
        nameId: sku_list[i].id,
        value:'',
        valueId:''
      }
      for (let j = 0; j < sku_list[i].childsCurGoods.length;j++){
          if (sku_list[i].childsCurGoods[j].remark == 'true'){
            sku_one.value = sku_list[i].childsCurGoods[j].name
            sku_one.valueId = sku_list[i].childsCurGoods[j].id
            choosed_sku.push(sku_one)
            }           
          }
      }
      //根据选中的规格获取价格
    if (choosed_sku.length>=2){
        var data = {
          goodsId: that.data.goodsInfo.basicInfo.id,
          propertyChildIds: choosed_sku[0].nameId + ':' + choosed_sku[0].valueId + ',' + choosed_sku[1].nameId + ':' + choosed_sku[1].valueId
        }
        WXAPI.goodsPrice(data).then(res => {
          //console.log(res)
          that.setData({
            price:res.data.price,
            oldprice: res.data.originalPrice
          })
        })
      }
    //console.log(choosed_sku)
     return choosed_sku
  },
  //判断选择的规格是否完整
  isAllSku(){
    return this.getChooseSku().some(function(v){
      if (v.value == ''){       
        return true
      }
    })
  },
  addCart(){
    var that = this
    var skuList = that.getChooseSku()
    //已经登录
    if (app.globalData.token){
      //判断规格选择是否完整
      if (that.isAllSku()) {
        Toast.fail('请选择规格参数！');
        return;
      }
      var cartList = wx.getStorageSync('cartList', cartList) || []
      var exist = cartList.find(function (ele) {
        return ele.id === that.data.goodsInfo.basicInfo.id && ele.sku[0].nameId === skuList[0].nameId && ele.sku[1].nameId === skuList[1].nameId && ele.sku[0].valueId === skuList[0].valueId && ele.sku[1].valueId === skuList[1].valueId
      })
      if (exist) {
        //如果存在，则增加该货品的购买数量
        exist.num = parseInt(exist.num) + that.data.goods_num
      } else {
        //如果不存在，传入该货品信息
        var sku = that.getChooseSku()
        cartList.push(
           
          {
            goodsId: that.data.goodsInfo.basicInfo.id,
            title: that.data.goodsInfo.basicInfo.name,//标题
            img: that.data.goodsInfo.basicInfo.pic,//图片
            price: that.data.price,//价格
            oldprice: that.data.oldprice,//原始价格
            number: that.data.goods_num,//数量
            sku: sku,//规格
            isChoosed:true,//是否选中
            propertyChildIds: sku[0].nameId + ':' + sku[0].valueId + ',' + sku[1].nameId + ':' + sku[1].valueId
          }
        )
      }
      wx.setStorageSync('cartList', cartList)
      Toast.success('加入购物车成功！');
      that.setData({
        show_sku: false,
        cart_num: cartList.length
      })
     // console.log(cartList)       
   } else{
      //后续完善
      //Toast.fail('库存不足！');
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  go_cart(){
    wx.reLaunch({
      url:"../cart/cart"
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
    var token = app.globalData.token
    var goodsId = that.data.goodsId
    if (token) {
      WXAPI.checkCollect(goodsId, token).then(res => {
        if (res.code == 0) {
          that.setData({
            collected: true
          })
        }
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