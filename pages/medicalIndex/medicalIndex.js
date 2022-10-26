const ip = 'http://192.168.126.45:84/'
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
    wx.request({
      url: ip+'setmeal/getSetmeal.do',
      //请求方法   get
      method: 'GET',
      // 返回数据格式 json
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var newList = res.data.data
        if(res.data.flag == false){
          wx.lin.showMessage({
            type: 'error',
            duration: 2000,
            content: '请检查网络',
          })
          return;
        }
        for (var i = 0; i < newList.length; i++) {
          if (newList[i].sex == "0") {
            newList[i].sex = "男女不限"
          }
          if (newList[i].sex == "1") {
            newList[i].sex = "男"
          }
          if (newList[i].sex == "2") {
            newList[i].sex = "女"
          }
          newList[i].img = "http://qz0709fz2.hn-bkt.clouddn.com/"+newList[i].img
        }
        that.setData({
          list: newList
        })
        console.log(that.data.list)
      }
    })
  },

  reserve(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var name = e.currentTarget.dataset.neirong;
    var remake = e.currentTarget.dataset.xiangqing;
    var sex = e.currentTarget.dataset.sex;
    var age = e.currentTarget.dataset.age;
    var img = e.currentTarget.dataset.img
    var id = e.currentTarget.dataset.id;
    var group = e.currentTarget.dataset.group;
    var arrayGroup = [];
    for (var i = 0; i < group.length; i++) {
      arrayGroup.push(group[i])
    }
    wx.navigateTo({
      url: '/pages/medicalDetails/medicalDetails?id=' + id + '&list=' + JSON.stringify(arrayGroup) + '&name=' + name + '&remake=' + remake + '&sex=' + sex + '&age=' + age + '&img=' + img,
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
    wx.lin.hideLoading();
    this.onLoad();
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

  /**
   * 进入到预约界面
   */
  reserve(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var name = e.currentTarget.dataset.neirong;
    var remake = e.currentTarget.dataset.xiangqing;
    var sex = e.currentTarget.dataset.sex;
    var age = e.currentTarget.dataset.age;
    var img = e.currentTarget.dataset.img
    var id = e.currentTarget.dataset.id;
    var group = e.currentTarget.dataset.group;
    var arrayGroup = [];
    for (var i = 0; i < group.length; i++) {
      arrayGroup.push(group[i])
    }
    wx.navigateTo({
      url:'/pages/medicalDetails/medicalDetails?id='+id+'&list='+JSON.stringify(arrayGroup)+'&name='+name+'&remake='+remake+'&sex='+sex+'&age='+age+'&img='+img,
    })
  },

  /**
   * 绑定并阻止事件冒泡 展开套餐详情
   */
  prevent_reserve() {
    console.log("阻止事件冒泡成功")
  }
})