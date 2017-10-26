var WxSearch = require('../../wxSearch/wxSearch.js');
// pages/mp3/mp3.js
Page({
  data: {
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: [],
    musicList:[]
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['天下', '我的', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
  },
  wxSearchInput: function (e) {
    var that = this
    console.log(e)
    WxSearch.wxSearchInput(e, that);
    const val = e.detail.value;
    that.setData({
      'search.showClearBtn': val != '' ? true : false,
      'search.searchValue': val
    })
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //输入内容时
  searchActiveChangeinput: function (e) {
    console.log(e.detail)
    const val = e.detail.value;
    this.setData({
      'search.showClearBtn': val != '' ? true : false,
      'search.searchValue': val
    })
  },
  //点击清除搜索内容
  searchActiveChangeclear: function (e) {
    this.setData({
      'search.showClearBtn': false,
      'search.searchValue': '',
      'wxSearchData.value': ''
    })
  },
  //点击聚集时
  focusSearch: function () {
    if (this.data.search.searchValue) {
      this.setData({
        'search.showClearBtn': true
      })
    }
  },
  huoqu: function (e, d) {
    var that = this;
    wx.request({
      url: "https://bird.ioliu.cn/joke/rand",
      success: function (res) {
        that.setData({
          demo: that.data.demo.concat(res.data.data)
        })
        // console.log(that.data.demo)
      }
    })
  },
  //搜索提交
  searchSubmit: function () {
    const val = this.data.search.searchValue;
    if (val) {
      const that = this,
        app = getApp();
      wx.showToast({
        title: '搜索中',
        icon: 'loading'
      });


      // 搜索音乐
      that.huoqu(d)

      wx.request({
        url: "https://bird.ioliu.cn/joke/rand",
        // data: {
        //   id: val,
        //   user_id: app.globalData.myInfo.user_id
        // },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          let searchResult = res.data.data;
          const len = searchResult.length;
          for (let i = 0; i < len; i++) {
            searchResult[i]['team_avator'] = app.globalData.STATIC_SOURCE + searchResult[i]['team_avator'];
          }
          that.setData({
            searchResult: searchResult,
            'search.showClearBtn': false,
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
          wx.hideToast();
        }
      })
    }
  }
})