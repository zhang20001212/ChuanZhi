// pages/healthReportList/five/fiveDetails/details.js
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
    var str = [];
    str.push(JSON.parse(decodeURIComponent(options.planList)).planClassify[1].content[0])
    this.setData({
      img:options.img,
      score:options.score,
      healthList:options.healthList,
      // 干预方案图片
      // planImg:JSON.parse(decodeURIComponent(options.planList)).managePlanImageUrl,
      // 干预方案提示
      planAdvice:JSON.parse(decodeURIComponent(options.planList)).healthAdvice,
      // 干预内容
      planContent:JSON.parse(decodeURIComponent(options.planList)).importentContent.template.value,
      // 饮食干预方案
      planEat :JSON.parse(decodeURIComponent(options.planList)).planClassify[0].content[0].template.content,
      // 饮食干预方案提示
      planExplain:JSON.parse(decodeURIComponent(options.planList)).planClassify[0].content[0].template.explain,
      planRemark:JSON.parse(decodeURIComponent(options.planList)).planClassify[0].content[0].template.remark,
      // 饮食干预方案饮食建议
      planSuggest:JSON.parse(decodeURIComponent(options.planList)).planClassify[0].content[2].template.value,
      // 饮食干预方案运动建议推荐运动
      planSport:str,
      // 饮食干预方案运动建议注意事项
      planSportAdvice:JSON.parse(decodeURIComponent(options.planList)).planClassify[1].content[1].template.value,
      // 饮食干预方案生活方式建议列表
      planLifeAdvice:JSON.parse(decodeURIComponent(options.planList)).planClassify[2].content,
      // 参考文献
      planLiterature:JSON.parse(decodeURIComponent(options.planList)).references,
      examList:JSON.parse(options.examList),
      riskList:JSON.parse(options.riskList)
    })
    console.log(this.data.planLiterature)
  },

  lookInfomation(){
    this.setData({
      healthFlag:true
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