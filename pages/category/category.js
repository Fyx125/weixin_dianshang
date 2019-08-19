// pages/category/category.js
import { getCategory, getSubcategory, getCategoryDetail} from '../../utils/category.js'
Page({

  /**
   * 页面的初始数据
   * categories-->分类列表数据
   * categoryData-->详细数据
   * currentIndex-->选择的分类
   */
  data: {
    categories:[],
    categoryData:{},
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory();
  },
  /**
   * 获取分类数据
   */
  _getCategory(){
    getCategory().then(res=>{
      //console.log(res);
      //获取categories
      const categories=res.data.data.category.list;
      //初始化每个类别的数据
      const categoryData={};
      for(let i=0;i<categories.length;i++){
        categoryData[i]={
          subcategories:[],
          categoryDetail:[]
        }
      }
      this.setData({
        categories,
        categoryData
      })
      //获取默认（第一个）类别的数据
      this._getSubcategory(0);
      //获取默认（第一个）类别的详情数据
      this._getCategoryDetail(0);
    })
  },
  _getSubcategory(currentIndex){
    const maitKey=this.data.categories[currentIndex].maitKey;
    getSubcategory(maitKey).then(res=>{
      //console.log(res);
      const tempCategoryData=this.data.categoryData;
      tempCategoryData[currentIndex].subcategories=res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex){
    const miniWallkey=this.data.categories[currentIndex].miniWallkey;
    this._getRealCategoryDetail(currentIndex,miniWallkey,'pop');
  },
  _getRealCategoryDetail(index,miniWallKey,type){
    getCategoryDetail(miniWallKey,type).then(res=>{
      console.log(res);
      const categoryData=this.data.categoryData;
      categoryData[index].categoryDetail=res.data;
      this.setData({
        categoryData
      })
    })
  },
  menuClick(event){
    //console.log(event);
    const currentIndex=event.detail.currentIndex;
    this.setData({
      currentIndex
    })
    //获取currentIndex对应类别的数据
    this._getSubcategory(currentIndex);
    //获取currentIndex对应类别的详情数据
    this._getCategoryDetail(currentIndex);
  }
})