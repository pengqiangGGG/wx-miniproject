let API_HOST = "http://xxx.com/xxx";
let DEBUG = true;//切换数据入口
var Mock = require('mock.js')


//首页banner图列表
function bannerList(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      // 'data|3': [{
      //   'id|+1': 1,
      //   'img':Mock.Random.image('720x160','#dd5415')
      //   // 'title': '@ctitle(3,8)',
      //   // 'city': "@county(true)",
      //   // 'stock_num': '@integer(0,100)',//库存数量  
      //   // 'marketing_start': '@datetime()',
      //   // 'marketing_stop': '@now()',
      //   // 'price': '@integer(100,2000)',//现价，单位：分  
      //   // 'original_price': '@integer(100,3000)'
      // }]
      'data': [{
        'id|+1': 1,
        'img': Mock.Random.image('720x320', '#0003b4', '#FFF', '1')
        // 'title': '@ctitle(3,8)',
        // 'city': "@county(true)",
        // 'stock_num': '@integer(0,100)',//库存数量  
        // 'marketing_start': '@datetime()',
        // 'marketing_stop': '@now()',
        // 'price': '@integer(100,2000)',//现价，单位：分  
        // 'original_price': '@integer(100,3000)'
      },{
          'id|+1': 2,
          'img': Mock.Random.image('720x320', '#2ac2fc', '#FFF', '2')
      },
      {
        'id|+1': 3,
        'img': Mock.Random.image('720x320', '#ffce44', '#FFF', '3')
      }
      ]
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}


//首页推荐商品列表
function commitGoods(data='',fn,method = 'get',header={}){
    if(!DEBUG){
      wx.request({
        url: config.API_HOST+data,
        method:method ? method : 'get',
        data:{},
        header: header ? header : { "Content-Type": "application/json" },
        success:function(res){
            fn(res)
        }
      })
    }else{
      var res = Mock.mock({
        'data|50':[
          {
            'id|+1':1,
            'img': Mock.Random.image('160x160', '#0003b4', '#FFF', 'mock图片'),
            'title': '@ctitle(8,10)',//标题
            'type':'1',
            // 'city': "@county(true)",//城市
            'sku':[
              { 'name': '尺寸', 'sku_name': [
                { 'name': '尺寸',"value": "30", "selected": false },
                { 'name': '尺寸',"value": "40", "selected": false }, 
                { 'name': '尺寸',"value": "50", "selected": false }, 
                { 'name': '尺寸',"value": "60", "selected": false },
                { 'name': '尺寸',"value": "70", "selected": false },
                { 'name': '尺寸',"value": "80", "selected": false }
                ]
              },
              { 'name': '颜色', 'sku_name': [
                { 'name': '颜色',"value": "黄色", "selected": false },
                { 'name': '颜色',"value": "绿色", "selected": false },
                { 'name': '颜色',"value": "红色", "selected": false },
                { 'name': '颜色',"value": "灰色", "selected": false },
                { 'name': '颜色',"value": "蓝色", "selected": false },
                { 'name': '颜色',"value": "黑色", "selected": false }
                ] 
              }
            ],//规格名称
            'stock_num': '@integer(0,100)',//库存数量  
            'marketing_start': '@datetime()',//开始时间
            'marketing_stop': '@now()',//结束时间
            'price': '@integer(100,2000)',//现价，单位：分  
            'original_price': '@integer(100,3000)',//原价
            'bannerImg':[
              Mock.Random.image('720x720', '#0003b4', '#FFF', 'mock图片'),
              Mock.Random.image('720x720', '#00d465', '#FFF', 'mock图片'),
              Mock.Random.image('720x720', '#03287c', '#FFF', 'mock图片'), 
            ],
            'detailImg':[
              Mock.Random.image('720x720', '#0003b4', '#FFF', 'mock图片'),
              Mock.Random.image('720x720', '#0003b4', '#FFF', 'mock图片'),
              Mock.Random.image('720x720', '#00d465', '#FFF', 'mock图片'),
              Mock.Random.image('720x720', '#03287c', '#FFF', 'mock图片'), 
              Mock.Random.image('720x720', '#0003b4', '#FFF', 'mock图片'),
              Mock.Random.image('720x720', '#00d465', '#FFF', 'mock图片'),
              Mock.Random.image('720x720', '#03287c', '#FFF', 'mock图片'), 
            ]
          }
        ]
      })
      fn(res)
    }
}

//分类列表
function navList(data = '',fn,method = "get",header={}){
  if(!DEBUG){
      wx.request({
        url: config.API_HOST + data,
        method: method ? method : 'get',
        data: {},
        header: header ? header : { "Content-Type": "application/json" },
        success: function (res) {
          fn(res)
        }
      })
  }else{
      var res = Mock.mock({
        'error_code': '',
        'error_msg': '',
        'navlist':[
          { 'id': 1, 'name': '居家' },
          
          { 'id': 2, 'name': '餐厨' },
          { 'id': 3, 'name': '配件' },
          { 'id': 4, 'name': '服装' },
          { 'id': 5, 'name': '洗护' },
          { 'id': 6, 'name': '婴童' },
          { 'id': 7, 'name': '杂货' },
          { 'id': 8, 'name': '饮食' },
          { 'id': 9, 'name': '志趣' },
        ],
        'categoryList':[
          { 'id': 1,'name': '居家','banner': Mock.Random.image('720x320', '#ffce44', '#FFF', ''),'img_text':"@ctitle(5,8)",
            'list|9':[
              { 
                'name':'@ctitle(2,4)',
                'id|+1':1,
                'icon_img': Mock.Random.image('160x160', '#ffce44', '#FFF', '')
              }
            ]
          },
          {
            'id': 2, 'name': '餐厨', 'banner': Mock.Random.image('720x320', '#fade44', '#FFF', ''), 'img_text': "@ctitle(5,8)",
            'list|7': [
              {
                'name': '@ctitle(2,4)',
                'id|+1': 1,
                'icon_img': Mock.Random.image('160x160', '#ffde44', '#FFF', '')
              }
            ]
          },
          {
            'id': 3, 'name': '配件', 'banner': Mock.Random.image('720x320', '#facd44', '#FFF', ''), 'img_text': "@ctitle(5,8)",
            'list|9': [
              {
                'name': '@ctitle(2,4)',
                'id|+1': 1,
                'icon_img': Mock.Random.image('160x160', '#ffcd44', '#FFF', '')
              }
            ]
          },
          {
            'id': 4, 'name': '服装', 'banner': Mock.Random.image('720x320', '#face44', '#FFF', ''), 'img_text': "@ctitle(5,8)",
            'list|9': [
              {
                'name': '@ctitle(2,4)',
                'id|+1': 1,
                'icon_img': Mock.Random.image('160x160', '#ffce44', '#FFF', '')
              }
            ]
          },
          {
            'id': 5, 'name': '洗护', 'banner': Mock.Random.image('720x320', '#fbce44', '#FFF', ''), 'img_text': "@ctitle(5,8)",
            'list|7': [
              {
                'name': '@ctitle(2,4)',
                'id|+1': 1,
                'icon_img': Mock.Random.image('160x160', '#fbce44', '#FFF', '')
              }
            ]
          },
          {
            'id': 6, 'name': '婴童', 'banner': Mock.Random.image('720x320', '#ffff44', '#FFF', ''), 'img_text': "@ctitle(5,8)",
            'list|6': [
              {
                'name': '@ctitle(2,4)',
                'id|+1': 1,
                'icon_img': Mock.Random.image('160x160', '#ffff44', '#FFF', '')
              }
            ]
          },
          {
            'id': 7, 'name': '杂货', 'banner': Mock.Random.image('720x320', '#fdce44', '#FFF', ''), 'img_text': "@ctitle(5,8)",
            'list|9': [
              {
                'name': '@ctitle(2,4)',
                'id|+1': 1,
                'icon_img': Mock.Random.image('160x160', '#fdce44', '#FFF', '')
              }
            ]
          },
          {
            'id': 8, 'name': '饮食', 'banner': Mock.Random.image('720x320', '#facc44', '#FFF', ''), 'img_text': "@ctitle(5,8)",
            'list|8': [
              {
                'name': '@ctitle(2,4)',
                'id|+1': 1,
                'icon_img': Mock.Random.image('160x160', '#ffcc44', '#FFF', '')
              }
            ]
          },
          {
            'id': 9, 'name': '志趣', 'banner': Mock.Random.image('720x320', '#ffaa44', '#FFF', ''), 'img_text': "@ctitle(5,8)",
            'list|12': [
              {
                'name': '@ctitle(2,4)',
                'id|+1': 1,
                'icon_img': Mock.Random.image('160x160', '#ffaa44', '#FFF', '')
              }
            ]
          },
        ]
      })
    fn(res)
  }
}

//分类商品
function cateGoods(data='',fn,method='get',header={}){
    if(!DEBUG){
      wx.request({
        url: config.API_HOST + data,
        method: method ? method : 'get',
        data: {},
        header: header ? header : { "Content-Type": "application/json" },
        success: function (res) {
          fn(res)
        }
      })
    }else{
      var res = Mock.mock({
        'data|12':[
           {
             'id|+1':1,
             'goods|10':[
               {
                 'id|+1': 1,
                 'img': Mock.Random.image('160x160', '#50adf1', '#FFF', 'mock图片'),
                 'title': '@ctitle(8,10)',//标题
                 'type': '2',
                 // 'city': "@county(true)",//城市
                 'sku': [
                   {
                     'name': '尺寸', 'sku_name': [
                       { 'name': '尺寸', "value": "30", "selected": false },
                       { 'name': '尺寸', "value": "40", "selected": false },
                       { 'name': '尺寸', "value": "50", "selected": false },
                       { 'name': '尺寸', "value": "60", "selected": false },
                       { 'name': '尺寸', "value": "70", "selected": false },
                       { 'name': '尺寸', "value": "80", "selected": false }
                     ]
                   },
                   {
                     'name': '颜色', 'sku_name': [
                       { 'name': '颜色', "value": "黄色", "selected": false },
                       { 'name': '颜色', "value": "绿色", "selected": false },
                       { 'name': '颜色', "value": "红色", "selected": false },
                       { 'name': '颜色', "value": "灰色", "selected": false },
                       { 'name': '颜色', "value": "蓝色", "selected": false },
                       { 'name': '颜色', "value": "黑色", "selected": false }
                     ]
                   }
                 ],//规格名称
                 'stock_num': '@integer(0,100)',//库存数量  
                 'marketing_start': '@datetime()',//开始时间
                 'marketing_stop': '@now()',//结束时间
                 'price': '@integer(100,2000)',//现价，单位：分  
                 'original_price': '@integer(100,3000)',//原价
                 'bannerImg': [
                   Mock.Random.image('720x720', '#0003b4', '#FFF', 'mock图片'),
                   Mock.Random.image('720x720', '#00d465', '#FFF', 'mock图片'),
                   Mock.Random.image('720x720', '#03287c', '#FFF', 'mock图片'),
                 ],
                 'detailImg': [
                   Mock.Random.image('720x720', '#0003b4', '#FFF', 'mock图片'),
                   Mock.Random.image('720x720', '#0003b4', '#FFF', 'mock图片'),
                   Mock.Random.image('720x720', '#00d465', '#FFF', 'mock图片'),
                   Mock.Random.image('720x720', '#03287c', '#FFF', 'mock图片'),
                   Mock.Random.image('720x720', '#0003b4', '#FFF', 'mock图片'),
                   Mock.Random.image('720x720', '#00d465', '#FFF', 'mock图片'),
                   Mock.Random.image('720x720', '#03287c', '#FFF', 'mock图片'),
                 ]
               }
             ]
           }               
        ]
      })
      fn(res)
    }

}

module.exports = {
  bannerList: bannerList,
  commitGoods: commitGoods,
  navList: navList,
  cateGoods: cateGoods
}