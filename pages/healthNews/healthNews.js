// pages/healthNews/healthNews.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thisUrl:'',
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://api.tianapi.com/health/index?key=bcdbd8f9f16fc7cc4d38852d1f55621f&num=30',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.newslist)
        that.setData({
          news: res.data.newslist
        })
      }
    })
  },
  // 显示模态框
  toDetails(e) {
    console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url;
    this.setData({
      thisUrl:url,
      show: true
    })
  },

  // 点击确认后进入每日新闻详情页。取消则不进入
  nextNews(){
    wx.navigateTo({
      url: '/pages/healthNews/newsDetails/newsDetails?url='+this.data.thisUrl,
    })
    this.setData({
      show:false
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