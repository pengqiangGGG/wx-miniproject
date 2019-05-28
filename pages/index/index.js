//index.js
//获取应用实例
const WXAPI = require('../../wxapi/main')
var app = getApp()
var API = require('../../utils/api.js')
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true
  },
  onLoad: function () {
    // console.log('onLoad')
    var that = this
    // 使用 Mock
    // API.bannerList('', function (res) {
    //   //这里既可以获取模拟的re
    //   that.setData({
    //     list: res.data
    //   })
    // });
    // API.commitGoods('',function(res){
    //   that.setData({
    //     commitList: res.data
    //   })
    // })
    //获得banner图
    WXAPI.banners({type:'index'}).then(res=>{
      //console.log(res)
      that.setData({
        banners: res.data
      })
    })
    WXAPI.goods().then(res=>{
        //console.log(res)
        that.setData({
          goodList:res.data
        })
    })
      //检查token是否过期
    var token = app.globalData.token
    if (token) {
      WXAPI.checkToken(token).then(res=>{
          if(res.code != 0){
            wx.navigateTo({
              url: '../login/login',
            })
          }
      })
    }
  },
  goDetail:function(event){
    // console.log(event)
    var id = event.currentTarget.dataset['postid']
    wx.navigateTo({
      url: '../good-info/good-info?id=' + id
    })
  },
  goCoupon(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  goSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  }
})