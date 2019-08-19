import network from './network.js'
const baseURL = 'http://123.207.32.32:8000/api/v1'

// 获取分类列表项数据
export function getCategory(){
  return network({
    url:baseURL+'/category'
  })
}

export function getSubcategory(maitKey){
  return network({
    url:baseURL+'/subcategory',
    data:{
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type){
  return network({
    url:baseURL+'/subcategory/detail',
    data:{
      miniWallkey,
      type
    }
  })
}