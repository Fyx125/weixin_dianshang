const baseURL = 'http://123.207.32.32:8000/api/v1'
import network from './network.js'
//获取商品详细信息
export function getDetail(iid){
  return network({
    url:baseURL+'/detail',
    data:{
      iid
    }
  })
}
//获取推荐商品信息
export function getRecommends() {
  return network({
    url: baseURL+'/recommend'
  })
}
// 封装商品基本信息类
export class BaseInfo{
  constructor(itemInfo, columns, services){
    this.title=itemInfo.title;
    this.desc=itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}
// 封装商家基本信息类
export class ShopInfo{
  constructor(shopInfo){
    this.logo=shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells;
    this.goodsCount=shopInfo.cGoods;
    this.score=shopInfo.score;
  }
}

//封装商品参数类
export class ParamInfo{
  constructor(info,rule){
    // images可能没有值
    this.images=info.images?info.images[0]:'';
    this.infos=info.set;
    this.sizes=rule.tables;
  }
}