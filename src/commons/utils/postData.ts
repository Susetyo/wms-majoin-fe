export interface IPostData {
  url:string,
  data: any
}

const postData = async({url,data}:IPostData) => {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response;
}

export default postData