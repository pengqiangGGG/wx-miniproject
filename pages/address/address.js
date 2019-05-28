// pages/address/address.js
const WXAPI = require('../../wxapi/main.js')
var areaList = require('../../utils/address.js')
import Toast from '../../lib/toast/toast';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    showBtn:false,
    user:'',
    phone:'',
    address:"",
    detail:'',
    email:'',
    cityId:'',
    provinceId:'',
    districtId:'',
    isDefault:false,
    addressId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    var that = this
    var token = app.globalData.token
    if (options.id){
        WXAPI.addressDetail(options.id,token).then(res=>{
          //console.log(res)
          if(res.code == 0){
              that.setData({
                user: res.data.linkMan,
                phone:res.data.mobile,
                address: res.data.provinceStr + " " + res.data.cityStr + " " + res.data.areaStr,
                detail: res.data.address,
                email: res.data.code,
                cityId: res.data.cityId,
                provinceId: res.data.provinceId,
                districtId: res.data.districtId,
                isDefault: res.data.isDefault,
                showBtn:true,
                addressId: options.id
              })
          }else{
            Toast.fail("获取地址失败！")
          }
        })
      }
    that.setData({
      list: areaList
    })
  },
  //获取姓名
  getUser(e){
    this.setData({
      user:e.detail
    })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail
    })
  },
  getDetail(e) {
    this.setData({
      detail: e.detail
    })
  },
  getEmail(e){
    this.setData({
      email: e.detail
    }) 
  },
  changeDefault(e){
      //console.log(e.detail)
    this.setData({ isDefault: e.detail });
  },
  // 点击选择地区
  chooseAddress(){
      this.setData({
        show:true
      })
  },
  // 关闭弹窗
  close(){
      this.setData({
        show: false
      })
  },
  // 保存地址
  save(e){
      //console.log(e.detail.values)
    var address = e.detail.values
    this.setData({
      address: address[0].name + ' ' + address[1].name + ' ' + address[2].name,
      cityId: address[1].code,
      provinceId: address[0].code,
      districtId: address[2].code,
      show: false
    })
  },
  // 保存
  submit(){
      var that = this
      var token = app.globalData.token
      var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
      var nameReg = /^[\u4E00-\u9FA5]{2,4}$/
      if (!nameReg.test(that.data.user)) {
        Toast.fail("请输入正确的联系人！")
        return
      }
      if (!phoneReg.test(that.data.phone)) {
        Toast.fail("请输入正确的联系电话！")
        return
      }
      if(that.data.address == ''){
        Toast.fail("请输入正确的地址！")
        return
      } 
      if (that.data.detail == '') {
        Toast.fail("请输入详细地址！")
        return
      }
      var data = {
        address: that.data.detail,
        code: that.data.email,
        cityId: that.data.cityId,
        linkMan:that.data.user,
        mobile:that.data.phone,
        provinceId: that.data.provinceId,
        isDefault:that.data.isDefault,
        districtId: that.data.districtId,
        token: token
      }
      
      WXAPI.addAddress(data).then(res=>{
        // console.log(res)
        if(res.code == 0){
          wx.navigateBack({
            delta: 1
          })
        }
      })
  },
  //修改
  update(){
    var that = this
    var token = app.globalData.token
    var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
    var nameReg = /^[\u4E00-\u9FA5]{2,4}$/
    if (!nameReg.test(that.data.user)) {
      Toast.fail("请输入正确的联系人！")
      return
    }
    if (!phoneReg.test(that.data.phone)) {
      Toast.fail("请输入正确的联系电话！")
      return
    }
    if (that.data.address == '') {
      Toast.fail("请输入正确的地址！")
      return
    }
    if (that.data.detail == '') {
      Toast.fail("请输入详细地址！")
      return
    }
    var data = {
      address: that.data.detail,
      code: that.data.email,
      cityId: that.data.cityId,
      linkMan: that.data.user,
      mobile: that.data.phone,
      provinceId: that.data.provinceId,
      isDefault: that.data.isDefault,
      districtId: that.data.districtId,
      token: token,
      id: that.data.addressId
    }

    WXAPI.updateAddress(data).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  //删除
  delete(){
    var that = this
    var token = app.globalData.token
    var id = that.data.addressId
    WXAPI.deleteAddress(id,token).then(res=>{
        if(res.code == 0){
            console.log(res)
            wx.navigateBack({
              delta: 1
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