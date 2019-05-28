// pages/rating/rating.js
const app = getApp()
const WXAPI = require('../../wxapi/main.js')
import Notice from '../../lib/notify/notify.js'
import Toast from '../../lib/toast/toast.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      rateList:[
        { value: 2, name: '好评',checked: 'true' },
        { value: 1, name: '中评'},
        { value: 0, name: '差评'},
      ],
      value:'',
      num:0,
      dec_rate:'',
      send_rate:'',
      orderId:'',
      service_rate:''
  },
  // 格式： {
  //   token: "登录接口获取的登录凭证",
  //   orderId: "数字订单号，订单接口的id，不是 orderNumber",
  //   reputations: [
  //     {
  //       id: "订单归属的商品列表数据的id段",
  //       reputation: "0 差评 1 中评 2 好评",
  //       remark: "评价备注，限200字符"
  //     }
  //     , {
  //       id: "订单归属的商品列表数据的id字段",
  //       reputation: "0 差评 1 中评 2 好评",
  //       remark: "评价备注，限200字符"
  //     }
  //   ]
  // }
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    var token = app.globalData.token
    if (id) {
      WXAPI.orderDetail(id, token).then(res => {
        // console.log(res)
        if (res.code == 0) {
          that.setData({
            goods: res.data.goods,
            logs: res.data.logs,
            orderInfo: res.data.orderInfo,
            orderId: options.id
          })
        } else {
          Toast.fail('获取订单详情失败！')
        }
      })
    }
  },
  radioChange(e) {
    var item = this.data.rateList;
    for (var i = 0; i < item.length; i++) {
      item[i].checked = item[i].value == e.detail.value;
    }
    this.setData({
      rateList: item
    })
  },

  changeValue(e) {
    // console.log(e)
    this.setData({
      num: e.detail.value.length
    })
  },
  decChange(event) {
    this.setData({
      dec_rate: event.detail
    });
  },
  sendChange(event) {
    this.setData({
      send_rate: event.detail
    });
  },
  serviceChange(event) {
    this.setData({
      service_rate: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  submitReputation: function (e) {
    // console.log(e)
    var that = this;
    var postJsonString = {};
    postJsonString.token = app.globalData.token;
    postJsonString.orderId = this.data.orderId;
    postJsonString.reputations = []
    var reputations = [];
    var i = 0;
    while (e.detail.value["orderGoodsId" + i]) {
      var orderGoodsId = e.detail.value["orderGoodsId" + i];
      var goodReputation = e.detail.value["goodReputation" + i];
      var goodReputationRemark = e.detail.value["goodReputationRemark" + i];

      var reputations_json = {};
      reputations_json.id = orderGoodsId;
      reputations_json.reputation = goodReputation;
      reputations_json.remark = goodReputationRemark;

      reputations.push(reputations_json);
      i++;
    }
    postJsonString.reputations = reputations;
    // wx.request({
    //   url: 'https://api.it120.cc/zhanglangeba/order/reputation',
    //   data: {
    //     postJsonString: postJsonString
    //   },
    //   success: (res) => {
    //     if (res.data.code == 0) {
    //       Notice({
    //       text: '评价成功',
    //       duration: 1000,
    //       selector: '#custom-selector',
    //       backgroundColor: '#1989fa'
    //     });
    //     wx.navigateBack({
    //       deale:1
    //     })
    //     }
    //   }
    // })
    // var data = {
    //   postJsonString: JSON.stringify(postJsonString)
    // }
    // console.log(data.postJsonString)
    WXAPI.orderReputation({postJsonString:JSON.stringify(postJsonString)}).then(res=>{
      console.log(res)
      if(res.code == 0){
        Toast("评价成功！");
       setTimeout(()=>{
         wx.navigateBack({
           deale: 1
         })
       },800)
      }
    })
  },
})