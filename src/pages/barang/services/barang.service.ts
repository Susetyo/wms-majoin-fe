import getData from '@/commons/utils/getData';
import postData,{IPostData} from '@/commons/utils/postData';

interface IBarangService{
  url:string,
}

const barangService = async({url}:IBarangService) => {
  try{
    const param = {
      url:url,
    }

    const fetch = await getData(param);

    if(fetch.ok){
      const res =  await fetch.json()
      return res?.data
    }else{
      throw(fetch)
    }
    
  }catch(e){
    return e
  }
}

export const addBarangService = async({url,data}:IPostData) => {
  try{
    const fetch = await postData({url,data})

    if(fetch.ok){
      const res = await fetch.json();
      return res
    }else{
      throw(fetch)
    }
  }catch(e){
    return e;
  }
}

export default barangService;