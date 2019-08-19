// pages/details/details.js
import { getDetail, getRecommends, BaseInfo, ShopInfo, ParamInfo} from '../../utils/details'
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid:'',
    isShow: false,
    topPosition: 0,
    topImages:[],
    baseInfo:[],
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    this.setData({
      iid: options.iid
    })
    this._getDetail();
    this._getRecommends();
  },
  _getDetail(){
    getDetail(this.data.iid).then(res=>{
      const data=res.data.result;
      //console.log(data);
      //获取轮播图数据
      const topImages = data.itemInfo.topImages;
      //创建BaseInfo对象并且传递数据进去
      const baseInfo = new BaseInfo(data.itemInfo,data.columns,data.shopInfo.services);
      // 创建ShopInfo对象=>商家信息
      const shopInfo = new ShopInfo(data.shopInfo);
      //创建detailInfo对象
      const detailInfo = data.detailInfo;
      //创建paramInfo对象=>参数信息(有的数据里面没有rule这个字段)
      const paramInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule);
      //创建评论信息对象
      let commentInfo={};
      if(data.rate&&data.rate.cRate>0){
        commentInfo=data.rate.list[0];
      }
      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends(){
    getRecommends().then(res=>{
      //console.log(res);
      this.setData({
        recommends:res.data.data.list
      })
    })
  },
  /**
 * 监听页面滚动的距离
 */
  scrollPosition(options) {
    //console.log(options)
    const scrollTop = options.detail.scrollTop;
    //页面滑动到一定位置显示回到顶部图标
    const flagShow = scrollTop >= 1000;
    if (flagShow != this.data.isShow) {
      this.setData({
        isShow: flagShow
      })
    }
  },
  onReturnTop(){
    this.setData({
      isShow: false,
      topPosition: 0
    })
  },
  onAddCart(){
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)
    //console.log(app.globalData.cartList);
    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})