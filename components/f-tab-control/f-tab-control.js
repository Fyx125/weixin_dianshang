// components/f-tab-control/f-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultActive:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabChange(event) {
      var index = event.currentTarget.dataset.index;
      this.setData({ defaultActive: index });
      this.triggerEvent("tabchange", { index, titles: this.data.titles[index] }, {});
    }
  }
})
