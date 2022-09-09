import getData from '@/commons/utils/getData';

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

export default barangService;