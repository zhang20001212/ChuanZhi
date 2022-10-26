const {
  formatTime
} = require("../../utils/util");

// pages/wenjuan/wenjuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newArry: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var time = formatTime(new Date())
    // 获取到token
    wx.request({
      url: 'https://api.jiankangyouyi.com/v2/auth/token?appId=61454d8a837fee4be5f2c072&apiKey=558140bc9f0a406bb90ac8ba36ac6680',
      success(res) {
        // console.log(res.data.data.token)
        var token = res.data.data.token
        // 获取测评问卷
        wx.request({
          url: 'https://api.jiankangyouyi.com/ego-gw/v4/evaluation/content/load.do?evaluationCode=GXYPC',
          method: 'POST',
          data: {
            "appId": "61454d8a837fee4be5f2c072",
            "nonceStr": "5cbef2212f6264792914e081",
            "reqData": {
              "evaluationCode": "GXYPC",
              "questionnaireParams": {
                "userId": "12344",
              }
            },
            "timestamp": time,
            "version": "2.0"
          },
          header: {
            // 'Content-Type': 'application/json',
            // 'Accept':'application/json;charset=utf-8',
            'token': token
          },
          success(res) {
            // console.log(JSON.parse(res.data.resData).quesOptions)
            that.setData({
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
      url: 'https://api.jiankangyouyi.com/v2/auth/token?appId=61454d8a837fee4be5f2c072&apiKey=558140bc9f0a406bb90ac8ba36ac6680',
      success(res) {
        // console.log(res.data.data.token)
        var token = res.data.data.token
        // 解析测评问卷
        wx.request({
          url: 'https://api.jiankangyouyi.com/ego-gw/v4/evaluation/content/analysis.do?evaluationCode=GXYPC',
          method: 'POST',
          data: {
            "nonceStr": "5cbef2212f6264792914e081",
            "appId": "61454d8a837fee4be5f2c072",
            "version": "2.0",
            "timestamp": time,
            "sign": "sign data",
            "reqData": {
              "basicParames": {
                "birthday": "1990-01-01",
                "pastHistory": ["4"],
                "gender": "1",
                "smoke": ["1"],
                "weight": "75.0",
                "userId": "12344",
                "diabetesFamilyHistory": ["3"],
                "sleep": ["1", "2", "3"],
                "abnormalSymptoms": ["1", "3"],
                "psychology": ["2"],
                "waist": "95",
                "diet": ["1", "2", "3", "4"],
                "sport": ["1"],
                "height": "175",
                "fastingBloodGlucose": ["20.0"],
                "postprandialBloodGlucose": ["22.0"]
              },
              "userOptions": that.data.newList
            }
          },
          header: {
            // 'Content-Type': 'application/json',
            // 'Accept':'application/json;charset=utf-8',
            'token': token
          },
          success(res) {
            var anaResult = JSON.parse(res.data.resData).analysisResult
            wx.request({
              url: 'https://api.jiankangyouyi.com/v2/auth/token?appId=61454d8a837fee4be5f2c072&apiKey=558140bc9f0a406bb90ac8ba36ac6680',
              success(res) {
                var token = res.data.data.token;
                wx.request({
                  url: 'https://api.jiankangyouyi.com/ego-gw/v4/evaluation/report/generate.do?evaluationCode=GXYPC',
                  method: 'POST',
                  header: {
                    // 'Content-Type': 'application/json',
                    // 'Accept':'application/json;charset=utf-8',
                    'token': token
                  },
                  data: {
                    "appId": "61454d8a837fee4be5f2c072",
                    "nonceStr": "5cbef2212f6264792914e081",
                    "reqData": {
                      "evaluationParams": anaResult
                    },
                    "timestamp": time,
                    "version": "2.0"
                  },
                  success(res) {
                    // console.log(res.data.resData)
                    var id = JSON.parse(res.data.resData).reportId
                    // 生成测评报告
                    wx.request({
                      url: 'https://api.jiankangyouyi.com/ego-gw/v4/evaluation/report/load.do?evaluationCode=GXYPC',
                      method: 'POST',
                      header: {
                        // 'Content-Type': 'application/json',
                        // 'Accept':'application/json;charset=utf-8',
                        'token': token
                      },
                      data: {
                        "reqData": {
                          "reportId": id
                        },
                        "nonceStr": "5cbef2212f6264792914e081",
                        "appId": "61454d8a837fee4be5f2c072",
                        "version": "2.0",
                        "timestamp": time,
                      },
                      success(res) {
                        console.log(JSON.parse(res.data.resData).result.healthGuide)
                        console.log(JSON.parse(res.data.resData).result.evaluationResult)
                        that.setData({
                          // 测评结果的标题
                          resultName: JSON.parse(res.data.resData).result.evaluationResult.name,
                          // 结果列表
                          // resultList:JSON.parse(res.data.resData).result.evaluationResult.content,
                          // 评估结果概览
                          overView: JSON.parse(res.data.resData).result.evaluationResult.content[0],
                          // 评估结果概览标题
                          title: JSON.parse(res.data.resData).result.evaluationResult.content[0].template.title,
                          // 评估结果概览风险级别
                          stateDesc: JSON.parse(res.data.resData).result.evaluationResult.content[0].template.evaluationStateDesc,
                          // 评估结果概览详解
                          remark: JSON.parse(res.data.resData).result.evaluationResult.content[0].template.remark,
                          // 评估结果概览风险因素列表
                          riskList: JSON.parse(res.data.resData).result.evaluationResult.content[1].template.riskFactorList,
                          // 评估结果概览风险因素总列表
                          allRiskList: JSON.parse(res.data.resData).result.evaluationResult.content[2].template.riskFactorList,
                          // 测评结果底部声明
                          resultBottomName: (JSON.parse(res.data.resData).result.evaluationResult.remarkList).join(","),
                          // 健康指导方案总概述
                          guideRemark:((JSON.parse(res.data.resData).result.healthGuide.content[0].template.remark).join('')),
                          // 健康指导方案干预内容
                          guideContent:((JSON.parse(res.data.resData).result.healthGuide.content[1].template.keyInterventionContents[0].content)),
                          // 健康指导方案烹饪方式推荐列表
                          cookingList:JSON.parse(res.data.resData).result.healthGuide.content[2].template.cookingMethod.principles,
                          // 健康指导方案饮食原则和禁忌列表
                          dietaryList:JSON.parse(res.data.resData).result.healthGuide.content[2].template.dietaryPrinciple.principles,
                          // 健康指导方案膳食处方列表
                          diteList:JSON.parse(res.data.resData).result.healthGuide.content[2].template.diteData.diteDataContents,
                          // 健康指导方案膳食处方列表中的remark
                          diteRemark:JSON.parse(res.data.resData).result.healthGuide.content[2].template.diteData.remarkList,
                          // 健康指导方案膳食处方计划方案
                          ditePlan:JSON.parse(res.data.resData).result.healthGuide.content[2].template.diteData.subExplain,
                          // 健康指导方案运动指导注意事项
                          sportAttention:JSON.parse(res.data.resData).result.healthGuide.content[3].template.sportAttention.attentions,
                          // 健康指导方案推荐运动列表
                          sportList:JSON.parse(res.data.resData).result.healthGuide.content[3].template.sportRecommendation.sportEventList,
                          // 健康指导方案生活方式指导列表
                          lifeList:JSON.parse(res.data.resData).result.healthGuide.content[4].template.lifeStyleList,
                          // 健康管理方案心里指导列表
                          psychologyList:JSON.parse(res.data.resData).result.healthGuide.content[5].template.psychologyList,
                          // 弹出pop显示测评报告
                          flag: true
                        })
                        // console.log(that.data.overView.template)
                        console.log(that.data.cookingList)
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  lookInfomation(){
    this.setData({
      healthFlag:true
    })
  },
  checkboxChange: function (e) {
    // console.log(e.currentTarget.dataset)
    // var questionCodeStr = e.detail.value.join(',')
    // var questionCode = questionCodeStr.substring(0, 1)
    // // console.log("标题的编号："+questionCode)
    // var array = []
    // for (var i = 0; i < e.detail.value.length; i++) {
    //   array.push(e.detail.value[i].substring(1, 2))
    // } 
    // var selected = {
    //   'questionCode': questionCode,
    //   'optionCodes': array,
    // };
    // var arr = [];
    // arr.push(selected)
    // console.log(JSON.stringify(arr))
    // this.setData({
    //   newList:arr
    // })
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
    var array = [];
    array.push(this.data.one, this.data.two, this.data.three, this.data.four, this.data.five, this.data.six, this.data.seven, this.data.eight, this.data.nine, this.data.ten);
    this.setData({
      newList: array
    })
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