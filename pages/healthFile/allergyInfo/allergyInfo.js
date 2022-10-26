const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: '',
    formShow: '',
    shwoPopWindow: '',
    peopleName: '',
    peopleAge: '',
    peopleCaseHistory: '',

    family: {
      peopleName: '',
      peopleAge: '',
      peopleCaseHistory: '',
      peopleRelation:'',
      peopleBrithday:'',
      peopleSex:'',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection('allergyinfotb').get({
      success(res) {
        that.setData({
          list: res.data
        })
        console.log(that.data.list)
        if (that.data.list.length == 0) {
          that.setData({
            show: true
          })
          console.log(this.data.show)
        } else if (that.data.list.length != 0) {
          that.setData({
            show: false
          })
          console.log(this.data.show)
        }
      }
    })
    wx.lin.initValidateForm(this)
    console.log("初始化表单数据成功")
  },

  avatar_pick(event) {
    var that = this;
    var avatarUrl = (event.detail.current).join(',')
    that.setData({
      newUrl: avatarUrl
    })
  },


  addSubmit(event) {
    var that = this;
    // detail 返回三个参数
    // 1、values: 各表单项的value值
    // 2、errors: 各表单项验证后的返回的错误信息数组
    // 3、isValidate: 表单是否验证通过的boolean值
    // 具体格式示例：
    var {
      detail
    } = event;

    detail = {
      values: {
        familyName: "",
        familyAge: "",
        familyCaseHistory: "",
        familyRelation:"",
        familyBrithday:"",
        familySex:"",
      },
      errors: {
        familyName: [],
        familyAge: [],
        familyCaseHistory: []
      },
      isValidate: true
    }
    that.setData({
      formShow: false,
      peopleName: '',
      peopleAge: '',
      peopleCaseHistory: ''
    })
    var newDetails = event.detail.values;
    console.log(newDetails)
    db.collection('allergyinfotb').add({
      data:{
        'userId':'10034',
        'image':that.data.newUrl,
        'name':newDetails.familyName,
        'brithday':newDetails.familyBrithday,
        'age':newDetails.familyAge,
        'relation':newDetails.familyRelation,
        'type':newDetails.familyCaseHistory
      },
      success(res){
        that.onLoad()
      }
    })
    console.log("有记录的表单" + JSON.stringify(event.detail.values))
  },

  lookFamilyHistory(e) {
    var that = this;
    var targetId = e.currentTarget.dataset.position
    db.collection('allergyinfotb').where({
      _id:targetId
    }).get({
      success(res){
        console.log(res.data[0].name)
        that.setData({
          popName:res.data[0].name,
          popAge:res.data[0].age,
          popImg:res.data[0].image,
          popRelation:res.data[0].relation,
          popType:res.data[0].type,
          popBrithday:res.data[0].brithday
        })
      }
    })
    that.setData({
      shwoPopWindow: true
    })
  },

  addFamilyHistory() {
    this.setData({
      formShow: true
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