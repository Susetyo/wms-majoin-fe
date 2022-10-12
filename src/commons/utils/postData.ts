export interface IPostData {
  url:string,
  data: any
}

const postData = async({url,data}:IPostData) => {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    body: JSON.stringify(data)
  });

  return response;
}

export default postData