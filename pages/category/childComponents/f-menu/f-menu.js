// pages/category/childComponents/f-menu/f-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(event){
      //console.log(event);
      const currentIndex=event.target.dataset.index;
      this.setData({
        currentIndex
      })
      //将点击的分类的currentIndex传递到分类页面
      this.triggerEvent('menuclick',{currentIndex},{});
    }
  }
})
