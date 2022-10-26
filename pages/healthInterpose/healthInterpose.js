const ip = 'http://192.168.126.45:84/'
const app = getApp()
var userId = app.globalData.userId;
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
    var that = this;
    that.setData({
      userId:options.userId
    })
    wx.request({
      url: ip+'scheme/schemeId.do?id='+userId,
      data:{

      },
      success(res){
        if(res.data.flag = true){
          console.log(res.data.data)
          var arr = [];
          arr.push(res.data.data.Scheme)
          that.setData({
            food :res.data.data.foodList,
            sport:res.data.data.sportList,
            scheme: arr
          })
          console.log(that.data.scheme)
        }
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

  },
})