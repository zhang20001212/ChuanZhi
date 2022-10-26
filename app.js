App({
  onLaunch: function () {
    wx.login({
      success: function (res) {}
    });
    if(!wx.cloud){
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    }else{
      wx.cloud.init({
        env: "cloud1-3gdau636959363e0", // 环境 ID
        traceUser: true,
      });
    }
  },

  
  /**
   * 发送验证码
   */
  dongtai: function () {
    var that = this;
    // 获取总秒数
    var seconds = this.globalData.max_seconds;
    // 显示倒计时
    this.globalData.send = false;
    // 设置秒数
    this.globalData.seconds = seconds;
    // 设置定时器
    var t = setInterval(function () {
      // 如果秒数小于0
      if (seconds <= 0) {
        // 停止定时器
        clearInterval(t);
        // 显示发送按钮
        that.globalData.send = true;
        // 停止执行
        return;
      }
      // 秒数减一
      seconds--;
      // 更新当前秒数
      that.globalData.seconds = seconds;
      // console.log(that.globalData.seconds)
    }, 1000);
  },
  globalData: {
    // 发送验证码按钮显示
    send: 'true',
    // 当前倒计时秒数
    seconds: "",
    // 总秒数
    max_seconds: 60,
    // 注册验证手机号
    register_phone: '',
    userId:"10034"
  },
});