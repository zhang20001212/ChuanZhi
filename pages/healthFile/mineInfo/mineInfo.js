//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
// var t_json = require('../../utils/json.js')
var formte = require('../../../utils/util')
var time = formte.formatTime(new Date());
var userId = app.globalData.userId;
Page({
  data: {
    // getPhone: '',
    complete: {
      completeName: '',
      completePhone: '',
      completeIdCard: '',
      completeAge: '',
      completeTime: time
    },

    nocomplete: {
      complete1Name: '',
      complete1Phone: '',
      complete1IdCard: '',
      complete1Age: '',
      complete1Gender:'',
      complete1Time: time
    },
    gender: '', // 表单年龄
  },

  onLoad(options) {
    var that = this;
    that.setData({
      userId:options.userId
    })
    db.collection('mineinfotb').where({
      userId: userId
    }).get({
      success(res) {
        console.log("用户id为："+userId)
        that.setData({
          list: res.data,
          id: res.data[0]._id
        })
      }
    })
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
    var info = event.detail.values
    console.log(info)
    db.collection('mineinfotb').doc(that.data.id).update({
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
        console.log(res)
        wx.showToast({
          title: '修改成功',
          success() {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }
        }, 1000)
      }
    })
  },
})