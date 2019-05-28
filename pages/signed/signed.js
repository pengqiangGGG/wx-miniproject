import initCalendar from '../../component/calendar/index';
import { setTodoLabels } from '../../component/calendar/index';
const WXAPI = require('../../wxapi/main.js')

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    initCalendar({
      afterTapDay: (currentSelect, allSelectedDays) => { //选择日期后执行的事件 currentSelect 当前点击的日期；allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数
        // 当选择的日期不是今天，直接 return 
        console.log(currentSelect)
        const myDate = new Date();
        // console.log('y:', myDate.getFullYear())
        // console.log('m:', myDate.getMonth() + 1)
        // console.log('d:', myDate.getDate())
        if (myDate.getFullYear() != currentSelect.year ||
          (myDate.getMonth() + 1) != currentSelect.month ||
          myDate.getDate() != currentSelect.day) {
          return
        }
        if (currentSelect.hasTodo) {
          wx.showToast({
            title: '今天已签到',
            icon: 'none'
          })
          return
        }
        WXAPI.scoreSign(wx.getStorageSync('token')).then(r => {
          wx.showToast({
            title: '签到成功',
            icon: 'none'
          })
          setTodoLabels({
            pos: 'bottom',
            dotColor: '#40',
            days: [{
              year: currentSelect.year,
              month: currentSelect.month,
              day: currentSelect.day,
              todoText: '已签到'
            }],
          });
        })
      }
    });
    WXAPI.scoreSignLogs({
      token: wx.getStorageSync('token')
    }).then(res => {
      if (res.code == 0) {
        res.data.result.forEach(ele => {
          const _data = ele.dateAdd.split(" ")[0]
          setTodoLabels({
            pos: 'bottom',
            dotColor: '#40',
            days: [{
              year: parseInt(_data.split("-")[0]),
              month: parseInt(_data.split("-")[1]),
              day: parseInt(_data.split("-")[2]),
              todoText: '已签到'
            }],
          });
        })
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