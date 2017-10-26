// pages/demo/demo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:{},
    demo: [],
    scrollTop: 0,
    floorstatus: false,
    getM:false,
    hasMore:true
  },
  scroll: function (e) {
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  imgDownload:function(e){
    // var dd = e.currentTarget.dataset.title
    // var cc = dd.split('.');
    // cc =  cc[cc.lenght-1];
    // console.log(dd,cc)
    // wx.downloadFile({
    //   url: dd,
    //   type: cc,
    //   success: function (res) {
    //     console.log("download success");
    //     that.setData({
    //       hidden: true,
    //       toastHidden: false,
    //       toastText: "恭喜你，图片保存成功"
    //     });
    //   },
    //   fail: function (res) {
    //     console.log("download fail");
    //     that.setData({
    //       hidden: true,
    //       toastHidden: false,
    //       toastText: "保存失败，请稍后再试"
    //     });
    //   },
    //   complete: function (res) {
    //     console.log("download complete");
    //   }
    // })
  },
  refresh:function(e){
    var that = this;
    that.setData({
      scrollTop: 0
    })
    wx.request({
      url: "https://bird.ioliu.cn/joke/rand",
      success: function (res) {
        that.setData({
          demo: res.data.data
        })
      }
    })
  },
  getMore:function(){
    var that = this;
    console.log(that)
    that.huoqu();
  },
  huoqu:function(){
    var that = this;
    wx.request({
      url: "https://bird.ioliu.cn/joke/rand",
      success: function (res) {
        that.setData({
          demo: that.data.demo.concat( res.data.data )
        })
        // console.log(that.data.demo)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.huoqu();
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