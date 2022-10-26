// pages/next/next.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeItemIndex:'',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      list:JSON.parse(options.list),
      id:options.id,
      name:options.name,
      remake:options.remake,
      sex:options.sex,
      age:options.age,
      img:options.img
    })
  },

  clickTap(e){
    this.setData({
      activeItemIndex:e.currentTarget.dataset.pos,
    }) 
    let value = !this.data.show;
    this.setData({
      show:value
    }) 
  },

  nextSubmit(){
    wx.navigateTo({
      url: '/pages/medicalSubmit/medicalSubmit?id='+this.data.id+'&img='+this.data.img+'&name='+this.data.name+'&remake='+this.data.remake+'&sex='+this.data.sex+'&age='+this.data.age,
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