const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封装微信的request
 */
function request(url,data={},method='get'){
    return new Promise((resolve,reject)=>{
        wx.request({
          url: '',
          data:data,
          method: method,
          header:{
            'Content-Type': 'application/json',
            //'X-Litemall-Token': wx.getStorageSync('token')
          },
          success:function(res){
              if(res.statusCode == 200){
                  if(res.data.error == 501){
                    // 清除登录相关内容
                    try {
                      wx.removeStorageSync('userInfo');
                      wx.removeStorageSync('token');
                    } catch (e) {
                      // Do something when catch error
                    }
                    // 切换到登录页面
                    wx.navigateTo({
                      url: '/pages/login/login'
                    });
                  }else{
                    resolve(res.data)
                  }
              }else{
                reject(res.errorMsg)
              }
          },
          fail:function(err){
              reject(err)
          }
        })
    })
}

//判断页面需不需要登录
function redirect(url){
  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

module.exports = {
  formatTime: formatTime,
  request,
  redirect,
}
