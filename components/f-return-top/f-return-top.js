// components/f-return-top/f-return-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReturnTop(){
      wx.pageScrollTo({
        scrollTop: 0,
        duration:0
      })
    }
  }
})
