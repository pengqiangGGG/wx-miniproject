// pages/feedback/feedback.js
import Toast from '../../lib/toast/toast.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['请选择反馈类型', '商品相关', '物流状况', '客户服务', '优惠活动', '功能异常', '产品建议', '其他'],
    show:false,
    title: '请选择反馈类型',
    index:0,
    message:'',
    inputTxt:'',
    isClear:false,
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      title: value,
      index: index,
      show:false
    })
  },

  onCancel() {
    this.setData({
      show: false
    })
  },
  chooseType(){
    this.setData({
      show:true
    })
  },
  changeValue(e){
    // console.log(e.detail.value)
    this.setData({
      num: e.detail.value.length,
      message: e.detail.value
    })
  },
  clearPhone(){
    this.setData({
      inputTxt: "",
      isClear:false
    })
  },
  keydown(e){
    if(e.detail.value.length>0){
      this.setData({
        isClear: true,
        inputTxt: e.detail.value
      })
    }else{
      this.setData({
        isClear: false,
        inputTxt: e.detail.value
      })
    }
  },
  submit(){
      if(this.data.index == 0){
        Toast.fail('请选择反馈类型！')
        return
      }else if(this.data.message == ''){
        Toast.fail('请输入反馈内容！')
        return
      }else if(this.data.inputTxt == ''){
        Toast.fail('请输入联系电话！')
        return
      }else{
        Toast.fail('已收到您的反馈！')
        wx.navigateBack({
          deale:1
        })
      }
  },
  onLoad: function (options) {

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