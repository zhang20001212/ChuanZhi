const { formatTime } = require("../../utils/util");
const app = getApp();
var userId = app.globalData.userId;
// pages/healthFile/healthFile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:["小面积皮肤损伤或者烧伤、烫伤，","抹上少许牙膏，可立即止血止痛;","腿抽筋，用力捏可能不会很快有效。","可以伸直腿，让脚尖回勾，指向自己，","能有效缓解抽筋。","护嗓，吃西瓜的时候摸点盐，会生成西瓜霜，护嗓子"],
    
    isConnect:null,
    myMessage:[],
    yourMessage:[]
  },


  test(event){
    var that  = this;
    if(event.detail.key == '1'){
      wx.navigateTo({
        url: '/pages/healthFile/mineInfo/mineInfo?userId='+userId,
      })
      console.log(that.data.userId)
      console.log("进入个人信息页面")
      return;
    }else if(event.detail.key == '2'){
      wx.navigateTo({
        url: '/pages/healthFile/familyInfo/familyInfo?userId='+userId
      })
      console.log(that.data.userId)
      console.log("进入家族史页面")
      return;
    }else if(event.detail.key == '3'){
      wx.navigateTo({
        url: '/pages/healthFile/caseInfo/caseInfo?userId='+userId,
      })
      console.log(that.data.userId)
      console.log("进入病例史页面")
      return;
    }else if(event.detail.key == '4'){
      wx.navigateTo({
        url: '/pages/healthFile/allergyInfo/allergyInfo?userId='+userId
      })
      console.log(that.data.userId)
      console.log("进入过敏史页面")
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userId:options.userId
    })
    console.log("用户id为："+that.data.userId)
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