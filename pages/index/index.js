//index.js
import {getMultiData,getGoodsData} from '../../utils/index.js'
const types=['pop','new','sell'];
Page({
  data: {
    banners:[],
    recommends:[],
    titles: ['流行', '新款', '精选'],
    goods:{
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] },
    },
    currentType:'pop',
    isShow:false,
    isTapFixed:false,
    tapScrollTop:0
  },
  onLoad:function(options){
    // 获取轮播图数据和热门推荐数据
    this._getMultiData();
    // 获取商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },
  onReady(){
    setTimeout(()=>{
      wx.createSelectorQuery().select("#tab-control").boundingClientRect(rect => {
        //console.log(rect);
        this.data.tapScrollTop = rect.top;
      }).exec();
    },1000);
  
  },
  /**
   *  上拉加载更多
   */
  onReachBottom(){
    this._getGoodsData(this.data.currentType);
  },
  /**
   * 监听页面滚动的距离
   */
  onPageScroll(options){
    const scrollTop=options.scrollTop;
    //页面滑动到一定位置显示回到顶部图标
    const flagShow = scrollTop >= 800;
    if (flagShow!=this.data.isShow){
      this.setData({
        isShow: flagShow
      })
    }
    //页面滑到tab-control组件所在位置时 添加fixed样式
    const flagTab = scrollTop >= this.data.tapScrollTop;
    if (flagTab != this.data.isTapFixed){
      this.setData({
        isTapFixed:flagTab
      })
    }
  },
  _getMultiData(){
    getMultiData().then(res => {
      //console.log(res)
      //对首页轮播图数据进行处理
      const banners = res.data.data.banner.list.map(item=>{
        return item.image
      });
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    const page=this.data.goods[type].page+1;
    getGoodsData(type,page).then(res=>{
      //console.log(res)
      const list=res.data.data.list;
      const oldList=this.data.goods[type].list;
      oldList.push(...list);
      const typeKey=`goods.${type}.list`;
      const pageKey=`goods.${type}.page`;
      this.setData({
        [typeKey]:oldList,
        [pageKey]:page
      })
    })
  },
  scrollPosition(){

  },
  loadMore(){

  },
  handleTabChange(event){
    const index= event.detail.index;
    //console.log(event);
    this.setData({
      currentType:types[index]
    })
  },
})
