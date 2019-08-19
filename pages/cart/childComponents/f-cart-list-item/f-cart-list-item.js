const app=getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods:{
      type:Object,
      value:{}
    },
    index:{
      type:Number
    }
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
    onCheckClick(event){
      //console.log(event);
      //查找到对应商品
      const goods=app.globalData.cartList.find(item => item.iid == this.properties.goods.iid);
      goods.checked=!goods.checked;
      //获取当前商品的index
      const index=event.currentTarget.dataset.index;
      //当前商品的回调
      app.changeGoodsState(index,goods);
      //console.log(goods,index);
    }
  }
})
