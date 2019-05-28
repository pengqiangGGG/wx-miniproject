

/**
 * 用户相关操作
 */
const util = require('../utils/util.js')
const WXAPI = require('../wxapi/main.js')

/**
 * Promise封装wx.checkSession
 */

function checkSession(){
    return new Promise((resolve,reject)=>{
        wx.checkSession({
          success:function(){
            resolve(true);
          },
          fail:function(){
            reject(false)
          }
        })  
    })
}


/**
 * Promise 封装wx.login
 */

function login(){
  return new Promise((resolve,reject)=>{
    wx.login({
      success: function (res) {
          if(res.code){
              resolve(res)
          }else{
            reject(res)
          }
      },
      fail:function(res){
          reject(res)
      }
    })
  })
}

/**
 * 调用微信登录
 * 
 */

function loginByweixin(userInfo){
      return new Promise((resolve,reject)=>{
        return login().then(res=>{
            //登录远程服务器，这里需要调用自己项目的后台接口，暂时没有
        //   util.request(api.xxxxx, {
        //     code: res.code,
        //     userInfo: userInfo
        //   }, 'POST').then(res => {
        //     if (res.errno === 0) {
        //       //存储用户信息
        //       wx.setStorageSync('userInfo', res.data.userInfo);
        //       wx.setStorageSync('token', res.data.token);

        //       resolve(res);
        //     } else {
        //       reject(res);
        //     }
        // })
         console.log(res.code)
          WXAPI.login({code:res.code}).then(res=>{
              console.log(res)
            // wx.setStorageSync('userInfo', userInfo);
            // wx.setStorageSync('token', res.code);
          }).catch(err=>{
            reject(err);
          })
        
      }).catch(err=>{
        reject(err);
      })
    }).catch(err=>{
      reject(err);
    })
}
// function loginByweixin(userInfo) {
//   wx.login({
//     success:res=>{
//       wx.setStorageSync('token', res.code)
//       wx.setStorageSync('userInfo', userInfo)
//     }
//   })
// }
/**
 * 判断用户是否登录
 */
function checkLogin(){
  return new Promise((resolve,reject)=>{
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  })
}

module.exports = {
  loginByweixin,
  checkLogin,
};