import postData from '@/commons/utils/postData';

export interface IData {
  nomor_material:string,
  nama_barang:string,
  date:string,
  posisi:string,
  qty: 10
}

interface IDataService{
  url:string,
  data: IData
}

const outgoingService = async({url, data}:IDataService) => {
  try{
    const fetch = await postData({url, data});
    if(fetch.ok){
      const res =  await fetch.json()
      return res
    }else{
      throw(fetch)
    }
  }catch(e){
    return e
  }
}

export default outgoingService;