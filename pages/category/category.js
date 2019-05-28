
const WXAPI = require('../../wxapi/main.js')

Page({
  data:{
      navList:[], //一级导航分类
      currentList:[] ,//二级导航分类
      allNavList:[],//所有的分类
      activeId:0
  },
  onLoad: function (options) {
    var that = this
    WXAPI.goodsCategory().then(res => {
      if(res.code == 0){
        var list = res.data.filter(function (item) {
         return item.level == 1 //一级类目
        })
        var currentList = res.data.filter(function (item) {
          return item.pid == '35632'
        })
        var currentNav = res.data.find(function (item) {
          return item.id == '35632'
        })
        //console.log(list)
        that.setData({
          navList: list,
          allNavList:res.data,
          currentList: currentList,
          currentNav: currentNav   
        })
      }     
    })
  },
  switchCate(event){
    var that = this
    var id = event.currentTarget.dataset['id']
    var index = event.currentTarget.dataset['index']
    var currentList = that.data.allNavList.filter(function(item){
      return item.pid == id
    })
    var currentNav = that.data.allNavList.find(function (item) {
      return item.id == id
    })
   // console.log(event)
    that.setData({
      currentList: currentList,
      activeId: index,
      currentNav: currentNav
    })
  }
})