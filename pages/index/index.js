// index.js
// 获取应用实例
const app = getApp()
var userId = app.globalData.userId;
Page({
  data: {
    one: '',
    two: '',
    three: ''
  },
  onLoad(options){
    var that = this;
    that.setData({
      userId:options.userId
    })
  },
  navigation(event){
    var that = this;
    if(event.detail.key == '1'){
      wx.navigateTo({
        url: '/pages/medicalIndex/medicalIndex',
      })
    }
    if(event.detail.key == '2'){
      wx.navigateTo({
        url: '/pages/healthReport/healthReport?userId='+userId,
      })
    }
    if(event.detail.key == '3'){
      wx.navigateTo({
        url: '/pages/healthReportList/reportList',
      })
    }
    if(event.detail.key == '4'){
      wx.navigateTo({
        url:'/pages/healthInterpose/healthInterpose?userId='+userId
      })
      console.log("健康干预界面")
    }
    if(event.detail.key == '5'){
      wx.navigateTo({
        url: '/pages/healthFile/healthFile',
      })
    }
    if(event.detail.key == '6'){
      wx.navigateTo({
        url: '/pages/healthNews/healthNews',
      })
    }
  },
  onSwiperTap(e) {
    var id = e.target.dataset.id;
    if (id == 1) {
      this.setData({
        one: true
      })
    }
    if (id == 2) {
      this.setData({
        two: true
      })
    }
    if (id == 3) {
      this.setData({
        three: true
      })
    }
  }
})