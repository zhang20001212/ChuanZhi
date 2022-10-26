//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
// var t_json = require('../../utils/json.js')
var formte = require('../../utils/util.js')
var time = formte.formatTime(new Date());
const ip = 'http://192.168.126.45:84/'
Page({
  data: {
    // getPhone: '',
    userId: '',
    people: {
      phone: "", // 表单手机号
      code: '', // 表单手机验证码
    },
    complete: {
      completeName: '',
      completePhone: '',
      completeIdCard: '',
      completeAge: '',
      completeTime: time
    },

    gender: '', // 表单年龄
    date: '', // 表单日历时间
    showCan: '', // 表单日历组件是否显示
    load: false, // 按钮是否显示加载样式
    send: app.globalData.send, //获取验证码后的60秒按钮为禁用状态
    seconds: app.globalData.seconds, // 当前倒计时秒数
    max_seconds: app.globalData.max_seconds, // 总秒数
    time: '', // 获取倒计时秒数定时器
  },
  submit(event) {
    /*
      detail 返回三个参数
      1、values: 各表单项的value值
      2、errors: 各表单项验证后的返回的错误信息数组
      3、isValidate: 表单是否验证通过的boolean值
      具体格式示例：
    */
    var that = this;
    var {
      detail
    } = event;
    detail = {
      values: {
        peoplePhoneNumber: "",
        peoplePhoneCode: '',
      },
      errors: {
        peoplePhoneNumber: [],
        peoplePhoneCode: [],
      },
      isValidate: true
    }
    console.log(event.detail.values)
    wx.lin.showLoading({
      type: 'circle',
      fullScreen: true,
    })
    setTimeout(() => {
      wx.lin.hideLoading()
      wx.request({
        url: ip + 'member/login4ValidateCode.do',
        //请求方法 post
        method: 'POST',
        data: {
          'telephone': event.detail.values.peoplePhoneNumber,
          'code': event.detail.values.peoplePhoneCode
        },
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          console.log(res)
          var newId = res.data.data
          if (res.data.flag == true) {
            that.setData({
              userId: newId
            })
            console.log("======>" + that.data.userId)
            wx.lin.showMessage({
              type: 'success',
              duration: 2000,
              content: res.data.message,
              success: () => {
                var that = this;
                db.collection('mineinfotb').where({
                  userId: newId.toString()
                }).get({
                  success(res) {
                    console.log(res.data)
                    if (res.data.length == '0') {
                      that.setData({
                        flag: true
                      })
                      return
                    }else{
                      wx.navigateTo({
                        url: '/pages/index/index?userId=' + that.data.userId,
                      })
                    }
                  }
                })
              }
            })
            return
          }else if(res.data.flag == false){
            wx.lin.showMessage({
              type: 'error',
              duration: 2000,
              content: res.data.message,
            })
          }
        },
      })
    }, 2000)
  },
  onLoad(options) {
    wx.lin.initValidateForm(this)
    console.log("初始化表单数据完成")
  },

  avatar_pick(event) {
    var that = this;
    var avatarUrl = (event.detail.current).join(',')
    that.setData({
      newUrl: avatarUrl
    })
  },
  /**
   * 
   * @param {完善个人信息表单} event 
   */
  completeSubmit(event) {
    /*
      detail 返回三个参数
      1、values: 各表单项的value值
      2、errors: 各表单项验证后的返回的错误信息数组
      3、isValidate: 表单是否验证通过的boolean值
      具体格式示例：
    */
    var that = this;
    var {
      detail
    } = event;
    detail = {
      values: {
        compeletePeopleId: '',
        completePeopleName: "",
        completePeopleGender: "",
        completePeoplePhone: "",
        completePeopleIdCard: '',
        completePeopleTime: '',
        completePeopleAge: '',
      },
      errors: {
        completePeopleName: [],
        completePeopleGender: [],
        completePeoplePhone: [],
        completePeopleIdCard: [],
        completePeopleTime: []
      },
      isValidate: true
    }
    var idcard = event.detail.values.completePeopleIdCard
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idcard))) {
      console.log(idcard)
      wx.lin.showMessage({
        type: 'error',
        duration: 1500,
        content: '身份证号格式错误',
      })
    } else {

      var info = event.detail.values
      console.log(info)
      db.collection('mineinfotb').add({
        data: {
          'userId': info.completePeopleId,
          'avatar': that.data.newUrl,
          'name': info.completePeopleName,
          'age': info.completePeopleAge,
          'phone': info.completePeoplePhone,
          'idcard': info.completePeopleIdCard,
          'sex': info.completePeopleGender,
          'time': info.completePeopleTime
        },
        success(res) {
          wx.navigateTo({
            url: '/pages/index/index?userId=' + that.data.userId,
          })
        }
      })
    }
  },
  selecetSex(e) {
    var that = this;
    that.setData({
      gender: e.detail.value
    })
  },

  /**
   * 发送短信验证按钮显示加载进入条
   */
  sendCode() {
    var that = this;
    if (!(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).test(that.data.getPhone)) {
      wx.lin.showMessage({
        type: 'error',
        duration: 1500,
        content: '请输入正确的手机号'
      })
      that.setData({
        load: false
      })
      return;
    }
    that.setData({
      load: true,
    })
    setTimeout(function () {
      // 调用倒计时
      app.dongtai();
      // 获取倒计时秒数
      that.listen();
      wx.request({
        url: ip + 'validateCode/send4Login.do?phone=' + that.data.getPhone,
        //请求方法   get
        method: 'POST',
        // 返回数据格式 json
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res)
          // 展示发送成功消息模框
          wx.lin.showMessage({
            type: 'success',
            duration: 2500,
            content: '发送成功',
            success: () => {
              that.setData({
                load: false
              })
            }
          })
        },
        fail(res) {
          // 展示验证码不正确消息模框
          wx.lin.showMessage({
            type: 'error',
            duration: 2500,
            content: '请检查网络',
            success: () => {
              that.setData({
                load: false
              })
            }
          })
        }
      })
    }, 1000)
  },


  /**
   * 点击发送动态码按钮
   */
  dongtai: function () {
    console.log(app)
    // 调用倒计时
    app.dongtai();
    // 获取倒计时秒数
    this.listen();
  },

  // 监听全局倒计时秒数
  listen: function () {
    var that = this;
    // 定时查询倒计时数据
    var time = setInterval(function () {
      that.setData({
        // 发送按钮显示
        send: app.globalData.send,
        // 当前倒计时秒数
        seconds: app.globalData.seconds,
        // 总秒数
        max_seconds: app.globalData.max_seconds,
      })
      // 倒计时结束停止定时获取
      if (app.globalData.send) {
        clearInterval(time);
      }
      // console.log('time')
    }, 200)
    // 存储定时器,便于清除
    that.setData({
      time: time,
    })
  },

  // 获取手机号
  getPhone(e) {
    var that = this;
    that.setData({
      getPhone: e.detail.value
    })
    // console.log(this.data.getPhone)
  },
})