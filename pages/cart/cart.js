// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    isSelectAll:true,
    totalPrice:0,
    totalCounter:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车中已有数据
    const cartList = app.globalData.cartList;
    //console.log(cartList);
    this.setData({
      cartList
    });
    this.changeData();
    //设置回调函数
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      });
      this.changeData();
      //console.log(this.data.cartList);
    }

    //设置单个商品的回调
    app.changeGoodsState= (index,goods) => {
      //修改单个商品的选中状态
      const cartListKey = `cartList[${index}]`;
      this.setData({
        [cartListKey]:goods
      });
      //修改全部选中的状态
      const selectAll=!this.data.cartList.find(item => !item.checked);
      this.setData({
        isSelectAll:selectAll
      });
      this.changeData();
    }
  },
  changeData(){
    //获取所有选中商品数据并计算价格
    let totalPrice=0;
    let totalCounter=0;
    for(let item of this.data.cartList){
      if(item.checked){
        totalCounter+=item.count;
        totalPrice+=item.price*item.count;
      }
    }
    this.setData({
      totalCounter,
      totalPrice,
    })
    console.log(totalCounter,totalPrice);
  },
  // onSelectAll(){
  //   //判断是否全部选中（默认全部选中）
  //   if(this.data.isSelectAll){
  //     this.data.cartList.forEach(item => {
  //       item.checked=false;
  //     });
  //     this.setData({
  //       cartList:this.data.cartList,
  //       isSelectAll:false
  //     });
  //     this.changeData();
  //   }else{
  //     this.data.cartList.forEach(item => {
  //       item.checked = true;
  //     });
  //     this.setData({
  //       cartList: this.data.cartList,
  //       isSelectAll: true
  //     });
  //     this.changeData();
  //   }

  // },
  onSelectAll(event) {
    //判断是否全部选中（默认全部选中）
    //console.log(event);
    if (!event.detail.selected) {
      this.data.cartList.forEach(item => {
        item.checked = false;
      });
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      });
      this.changeData();
    } else {
      this.data.cartList.forEach(item => {
        item.checked = true;
      });
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      });
      this.changeData();
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: `购物车(${app.globalData.cartList.length})`,
    })
  }
})