const {
  formatTime
} = require("../../../utils/util");
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
    var time = formatTime(new Date())
    // 获取到token
    wx.request({
      url: 'https://api.jiankangyouyi.com/v2/auth/token?appId=61527410837fee1bc97b6f43&apiKey=ff39db6d7fb44f3d8a3673a614211617',
      success(res) {
        var token = res.data.data.token
        that.setData({
          chinaToken: token
        })
        // 获取西医高血压测评问卷
        wx.request({
          url: 'https://api.jiankangyouyi.com/ego-gw/v2/evaluation/content/load.do?type=STJKCP',
          method: 'POST',
          header: {
            // 'Content-Type': 'application/json',
            // 'Accept':'application/json;charset=utf-8',
            'token': token
          },
          data: {
            "appId": "61527410837fee1bc97b6f43",
            "nonceStr": "5cbef2212f6264792914e081",
            "reqData": {
              "evaluationCode": "STJKCP",
              "userInfo": {
                "userName": "张三",
                "gender": "1",
                "birthday": "1936-11-11",
                "height": 170,
                "weight": 90
              }
            },
            "timestamp": time,
            "version": "2.0"
          },
          success(res) {
            // console.log(JSON.parse(res.data.resData))
            that.setData({
              quesBankId: JSON.parse(res.data.resData).quesBankId,
              list: JSON.parse(res.data.resData).quesOptions
            })
          }
        })
      }
    })
  },
  // 提交测评表
  submit() {
    var that = this;
    var time = formatTime(new Date())
    wx.request({
      url: 'https://api.jiankangyouyi.com/v2/auth/token?appId=61527410837fee1bc97b6f43&apiKey=ff39db6d7fb44f3d8a3673a614211617',
      success(res) {
        // console.log(res.data.data.token)
        var token = res.data.data.token
        // 保存健康测评问卷
        wx.request({
          url: 'https://api.jiankangyouyi.com/ego-gw/v2/evaluation/data/save.do?type=STJKCP',
          method: 'POST',
          data: {
            "nonceStr": "5cbef2212f6264792914e081",
            "appId": "61527410837fee1bc97b6f43",
            "version": "2.0",
            "timestamp": time,
            "sign": "sign data",
            "reqData": {
              "quesBankId": that.data.quesBankId,
              "evaluationCode": "STJKCP",
              "userInfo": {
                "userName": "张三",
                "gender": "1",
                "birthday": "1936-11-11",
                "height": 170,
                "weight": 90
              },
              // "userOptions": [
              //   {
              //     "questionCode":"1",
                  
              //     "optionCodes":["1","2"]
              //   },
              //   {
              //     "questionCode":"2",
                  
              //     "optionCodes":["1","2"]
              //   }
              // ]
              "userOptions":that.data.newList
            }
          },
          header: {
            // 'Content-Type': 'application/json',
            // 'Accept':'application/json;charset=utf-8',
            'token': token
          },
          success(res) {
            // console.log(that.data.newList)
            // console.log(JSON.parse(res.data.resData))
            var evaId = JSON.parse(res.data.resData).evaluationId
            // console.log(evaId)
            wx.request({
              url: 'https://api.jiankangyouyi.com/ego-gw/v2/evaluation/result/load.do?type=STJKCP',
              method:"POST",
              header:{
                'token':token
              },
              data:{
                "nonceStr": "5cbef2212f6264792914e081",
                "appId": "61527410837fee1bc97b6f43",
                'reqData':{
                  "evaluationId":evaId
                },
                "version": "2.0",
                "timestamp": time,
                "sign": "sign data",
              },
              success(res){
                // console.log(JSON.parse(res.data.resData))
                that.setData({
                  img:JSON.parse(res.data.resData).imageUrl,
                  score:(JSON.parse(res.data.resData).evaluationReport.content[3].template.value).join(','),
                  riskList:JSON.parse(res.data.resData).evaluationReport.content[0].template.dataList,
                  healthList:(JSON.parse(res.data.resData).evaluationReport.content[1].template.value).join(','),
                  examList:JSON.parse(res.data.resData).evaluationReport.content[2].template.dataList,
                  planList:JSON.parse(res.data.resData).managementPlan
                })
                console.log(JSON.parse(res.data.resData))
                wx.navigateTo({
                  url: '/pages/healthReportList/five/fiveDetails/details?riskList='+JSON.stringify(that.data.riskList)+'&score='+that.data.score+'&healthList='+that.data.healthList+'&examList='+JSON.stringify(that.data.examList)+'&planList='+encodeURIComponent(JSON.stringify(that.data.planList))+'&img='+that.data.img,
                })
              }
            })
          }
        })
      }
    })
  },

  lookInfomation() {
    this.setData({
      healthFlag: true
    })
  },
  checkboxChange: function (e) {
    this.setData({
      selectList: e.detail.value,
    })
  },
  tap(e) {
    var str = (e.currentTarget.dataset.no).toString();
    var select = {
      "questionCode": str,
      "optionCodes": this.data.selectList
    }
    if (str == '1') {
      this.setData({
        one: select
      })
    }
    if (str == '2') {
      this.setData({
        two: select
      })
      // console.log(this.data.two)
    }
    if (str == '3') {
      this.setData({
        three: select
      })
    }
    if (str == '4') {
      this.setData({
        four: select
      })
    }
    if (str == '5') {
      this.setData({
        five: select
      })
    }
    if (str == '6') {
      this.setData({
        six: select
      })
    }
    if (str == '7') {
      this.setData({
        seven: select
      })
    }
    if (str == '8') {
      this.setData({
        eight: select
      })
    }
    if (str == '9') {
      this.setData({
        nine: select
      })
    }
    if (str == '10') {
      this.setData({
        ten: select
      })
    }
    if (str == '11') {
      this.setData({
        eleven: select
      })
    }
    if (str == '12') {
      this.setData({
        shier: select
      })
    }
    if (str == '13') {
      this.setData({
        shisan: select
      })
    }
    if (str == '14') {
      this.setData({
        shisi: select
      })
    }
    if (str == '15') {
      this.setData({
        shiwu: select
      })
    }
    if (str == '16') {
      this.setData({
        shiliu: select
      })
    }
    if (str == '17') {
      this.setData({
        shiqi: select
      })
    }
    if (str == '18') {
      this.setData({
        shiba: select
      })
    }
    if (str == '19') {
      this.setData({
        shijiu: select
      })
    }
    if (str == '20') {
      this.setData({
        ershi: select
      })
    }
    if (str == '21') {
      this.setData({
        eryi: select
      })
    }
    if (str == '22') {
      this.setData({
        erer: select
      })
    }
    if (str == '23') {
      this.setData({
        ersan: select
      })
    }
    if (str == '24') {
      this.setData({
        ersi: select
      })
    }
    if (str == '25') {
      this.setData({
        erwu: select
      })
    }
    if (str == '26') {
      this.setData({
        erliu: select
      })
    }
    if (str == '27') {
      this.setData({
        erqi: select
      })
    }
    if (str == '28') {
      this.setData({
        erba: select
      })
    }
    if (str == '29') {
      this.setData({
        erjiu: select
      })
    }
    if (str == '30') {
      this.setData({
        sanshi: select
      })
    }
    if (str == '32') {
      this.setData({
        sanyi: select
      })
    }
    
    var array = [];
    array.push(this.data.one, this.data.two, this.data.three, this.data.four, this.data.five, this.data.six, this.data.seven, this.data.eight, this.data.nine, this.data.ten,this.data.eleven,this.data.shier,this.data.shisan,this.data.shisi,this.data.shiwu,this.data.shiliu,this.data.shiqi,this.data.shiba,this.data.shijiu,this.data.ershi,this.data.eryi,this.data.erer,this.data.ersan,this.data.ersi,this.data.erwu,this.data.erliu,this.data.erqi,this.data.erba,this.data.erjiu,this.data.sanshi);
    this.setData({
      newList: array
    })
    console.log("西医选项是======")
    console.log(JSON.stringify(this.data.newList))
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