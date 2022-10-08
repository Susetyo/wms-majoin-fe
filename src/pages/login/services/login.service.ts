import postData from '@/commons/utils/postData';

interface ILoginService{
  username:string,
  password:string
}

const loginService = async({username,password}:ILoginService) => {
  const param = {
    url:`${import.meta.env.VITE_REST_URL}/api/user/auth`,
    data:{username,password}
  }

  const fetch = await postData(param);

  if(fetch.ok){
    const res =  await fetch.json()
    return res?.data
  }

  return fetch;
}

export default loginService;