//获取应用实例
const app = getApp()
var formte = require('../../utils/util.js')
const ip = 'http://192.168.126.45:84/';
Page({
  data: {
    // getPhone: '',
    people: {
      name: '', // 表单姓名
      phone: "", // 表单手机号
      code: '', // 表单手机验证码
      idcard: '', // 表单身份证号
    },

    gender: '', // 表单年龄
    date: '', // 表单日历时间
    showCan: '', // 表单日历组件是否显示
    load: false, // 按钮是否显示加载样式
    send: app.globalData.send, //获取验证码后的60秒按钮为禁用状态
    seconds: app.globalData.seconds, // 当前倒计时秒数
    max_seconds: app.globalData.max_seconds, // 总秒数
    time: '', // 获取倒计时秒数定时器

    newTitle: '',
    newDetails: '',
    newImg: '',
    newSex: '',
    newAge: '',


    userRules: [{
        required: true
      },
      {
        min: 2,
        max: 5,
        message: '姓名格式不正确'
      }
    ],

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
        peopleName: "",
        peopleGender: "",
        peoplePhoneNumber: "",
        peoplePhoneCode: '',
        peopleIdCard: '',
        peopleMedicalTime: ''
      },
      errors: {
        peopleName: [],
        peopleGender: [],
        peoplePhoneNumber: [],
        peoplePhoneCode: [],
        peopleIdCard: [],
        peopleMedicalTime: []
      },
      isValidate: true
    }
    if (event.detail.values.peopleGender == '男') {
      event.detail.values.peopleGender = '0'
    }
    if (event.detail.values.peopleGender == '女') {
      event.detail.values.peopleGender = '1'
    }
    console.log(event.detail.values)
    var name = event.detail.values.peopleName;
    var service = that.data.newTitle;
    var newDate = that.data.date;
    var type = '微信预约'

    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.data.getsIdCard))) {
      wx.lin.showMessage({
        type: 'error',
        duration: 1500,
        content: '身份证号格式错误',
        success: () => {
          console.log("身份证号校验数据成功")
        }
      })
    } else {
      wx.lin.showLoading({
        type: 'circle',
        fullScreen: true,
      })
      setTimeout(() => {
        wx.lin.hideLoading()
        wx.request({
          url: ip+'order/submit.do',
          //请求方法 post
          method: 'POST',
          data: {
            'setmealId': that.data.id,
            'name': event.detail.values.peopleName,
            'sex': event.detail.values.peopleGender,
            'phone': event.detail.values.peoplePhoneNumber,
            'code': event.detail.values.peoplePhoneCode,
            'idCard': event.detail.values.peopleIdCard,
            'orerDate': event.detail.values.peopleMedicalTime
          },
          header: {
            'content-type': 'application/json',
          },
          success: (res) => {
            console.log(res.data.message)
            if (res.data.flag == true) {
              wx.lin.showMessage({
                type: 'success',
                duration: 2000,
                content: res.data.message,
                success: () => {
                  wx.navigateTo({
                    url: '/pages/successMedical/successMedical?p_name=' + name + '&p_service=' + service + '&p_date=' + newDate + '&p_type=' + type,
                  })
                }
              })
            }else{
              wx.lin.showMessage({
                type: 'error',
                duration: 2000,
                content: res.data.message,
                success: () => {
                  that.onLoad();
                }
              })
            }
          },
          fail: (res) => {
            console.log(res);
            wx.lin.showMessage({
              type: 'warning',
              duration: 2500,
              content: '请检查网络',
              success: () => {}
            })
          }
        })
      }, 2000)
    }
  },
  sex(e) {
    var that = this;
    that.setData({
      gender: e.detail.value
    })
    // console.log(this.data.gender)
  },

  select(e) {
    // console.log(e.detail);
    var time = formte.formatTime(e.detail);
    var newTime = time.substring(0, 10)
    this.setData({
      date: newTime
    })
    // console.log(this.data.date)
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
        url: ip+'validateCode/send4Order.do?phone=' + that.data.getPhone,
        //请求方法   get
        method: 'POST',
        // 返回数据格式 json
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          // 展示发送成功消息模框
          wx.lin.showMessage({
            type: 'success',
            duration: 2500,
            content: res.data.message,
            success: () => {
              that.setData({
                load: false
              })
            }
          })
        },
        fail(res) {
          console.log(res)
          // 展示验证码不正确消息模框
          wx.lin.showMessage({
            type: 'success',
            duration: 2500,
            content: res.data.message,
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

  onLoad(options) {
    var that = this;
    // console.log(t_json.array[0].data)
    wx.lin.initValidateForm(this)
    console.log("初始化表单数据完成")
    // var thisDay = util.formatTime(new Date());
    var day = formte.formatTime(new Date());
    var thisDay = day.substring(0, 10)
    that.setData({
      date: thisDay
    })

    that.setData({
      newTitle: options.name,
      newDetails: options.remake,
      newImg: options.img,
      newAge: options.age,
      newSex: options.sex,
      id: options.id
    })
    console.log(this.data.id)
  },

  /**
   * 日历弹出事件
   */
  seRiLi() {
    this.setData({
      showCan: true
    })
    // console.log(this.data.show)
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
  // 获取身份证号
  getIdcard(e) {
    var that = this;
    that.setData({
      getsIdCard: e.detail.value
    })
    console.log("身份证号是:" + this.data.getsIdCard)
  },
  // 获取体检人姓名
  getName(e) {
    var that = this;
    that.setData({
      getName: e.detail.value
    })
    console.log(this.data.getName)
  },
  // 查看预约须知
  lookNotice() {
    wx.navigateTo({
      url: '/pages/notice/notice',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})