const baseURL ='http://123.207.32.32:8000/api/v1'
import network from './network.js'

export function getMultiData(){
  return network({
    url:baseURL+'/home/multidata'
  })
}

export function getGoodsData(type,page){
  return network({
    url: baseURL+'/home/data',
    data:{
      type,
      page
    }
  })
}